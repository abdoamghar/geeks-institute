const pool = require('../db/pool');
const { HttpError } = require('../utils/http');

async function borrow({ member_id, book_id, due_date }) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const due = await client.query('SELECT $1::date > CURRENT_DATE AS valid', [due_date]);
    if (!due.rows[0].valid) throw new HttpError(400, 'due_date must be later than today');

    const member = await client.query('SELECT id FROM members WHERE id = $1', [member_id]);
    if (!member.rowCount) throw new HttpError(404, 'Member not found');

    // The row lock serializes requests for the last copy.
    const book = await client.query(
      'SELECT id, available_copies FROM books WHERE id = $1 FOR UPDATE',
      [book_id]
    );
    if (!book.rowCount) throw new HttpError(404, 'Book not found');
    if (book.rows[0].available_copies === 0) {
      throw new HttpError(409, 'No copies available');
    }

    await client.query(
      'UPDATE books SET available_copies = available_copies - 1 WHERE id = $1',
      [book_id]
    );
    const result = await client.query(
      `INSERT INTO loans (member_id, book_id, due_date)
       VALUES ($1, $2, $3)
       RETURNING id, member_id, book_id, borrow_date, due_date, return_date`,
      [member_id, book_id, due_date]
    );
    await client.query('COMMIT');
    return result.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function returnLoan(id) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // The conditional update also locks the loan row, preventing double returns.
    const result = await client.query(
      `UPDATE loans SET return_date = CURRENT_DATE
        WHERE id = $1 AND return_date IS NULL
       RETURNING id, member_id, book_id, borrow_date, due_date, return_date`,
      [id]
    );
    if (!result.rowCount) {
      const existing = await client.query('SELECT id FROM loans WHERE id = $1', [id]);
      throw new HttpError(existing.rowCount ? 409 : 404,
        existing.rowCount ? 'Loan already returned' : 'Loan not found');
    }
    await client.query(
      'UPDATE books SET available_copies = available_copies + 1 WHERE id = $1',
      [result.rows[0].book_id]
    );
    await client.query('COMMIT');
    return result.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function bookReport() {
  const result = await pool.query(
    `SELECT b.id, b.title, b.author, b.category, b.total_copies,
            b.available_copies, COUNT(l.id)::integer AS loan_count
       FROM books b
       LEFT JOIN loans l ON l.book_id = b.id
      GROUP BY b.id
      ORDER BY b.id`
  );
  return result.rows;
}

async function overdueReport() {
  const result = await pool.query(
    `SELECT l.id, l.member_id, m.full_name AS member_name,
            l.book_id, b.title AS book_title, l.borrow_date, l.due_date
       FROM loans l
       JOIN members m ON m.id = l.member_id
       JOIN books b ON b.id = l.book_id
      WHERE l.return_date IS NULL AND l.due_date < CURRENT_DATE
      ORDER BY l.due_date, l.id`
  );
  return result.rows;
}

module.exports = { borrow, returnLoan, bookReport, overdueReport };
