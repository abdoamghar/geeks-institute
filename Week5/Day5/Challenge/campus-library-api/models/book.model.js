const pool = require('../db/pool');

async function list({ title, category }) {
  const result = await pool.query(
    `SELECT id, title, author, category, total_copies, available_copies
       FROM books
      WHERE ($1::text IS NULL OR position(lower($1) in lower(title)) > 0)
        AND ($2::text IS NULL OR lower(category) = lower($2))
      ORDER BY id`,
    [title ?? null, category ?? null]
  );
  return result.rows;
}

async function findById(id) {
  const result = await pool.query(
    `SELECT id, title, author, category, total_copies, available_copies
       FROM books WHERE id = $1`,
    [id]
  );
  return result.rows[0] ?? null;
}

async function create({ title, author, category, total_copies }) {
  const result = await pool.query(
    `INSERT INTO books (title, author, category, total_copies, available_copies)
     VALUES ($1, $2, $3, $4, $4)
     RETURNING id, title, author, category, total_copies, available_copies`,
    [title, author, category, total_copies]
  );
  return result.rows[0];
}

async function update(id, changes) {
  const fields = Object.keys(changes);
  const assignments = fields.map((field, index) => `${field} = $${index + 2}`);
  const result = await pool.query(
    `UPDATE books SET ${assignments.join(', ')} WHERE id = $1
     RETURNING id, title, author, category, total_copies, available_copies`,
    [id, ...fields.map((field) => changes[field])]
  );
  return result.rows[0] ?? null;
}

async function removeIfNoHistory(id) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const book = await client.query('SELECT id FROM books WHERE id = $1 FOR UPDATE', [id]);
    if (!book.rowCount) {
      await client.query('ROLLBACK');
      return 'missing';
    }
    const history = await client.query('SELECT 1 FROM loans WHERE book_id = $1 LIMIT 1', [id]);
    if (history.rowCount) {
      await client.query('ROLLBACK');
      return 'has_loans';
    }
    await client.query('DELETE FROM books WHERE id = $1', [id]);
    await client.query('COMMIT');
    return 'deleted';
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

module.exports = { list, findById, create, update, removeIfNoHistory };
