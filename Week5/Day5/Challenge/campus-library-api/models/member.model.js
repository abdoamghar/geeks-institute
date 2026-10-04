const pool = require('../db/pool');

async function create({ full_name, email, join_date }) {
  const result = await pool.query(
    `INSERT INTO members (full_name, email, join_date)
     VALUES ($1, $2, COALESCE($3::date, CURRENT_DATE))
     RETURNING id, full_name, email, join_date`,
    [full_name, email, join_date ?? null]
  );
  return result.rows[0];
}

async function findById(id) {
  const result = await pool.query(
    'SELECT id, full_name, email, join_date FROM members WHERE id = $1',
    [id]
  );
  return result.rows[0] ?? null;
}

async function loanHistory(id) {
  const result = await pool.query(
    `SELECT l.id, l.book_id, b.title AS book_title, l.borrow_date,
            l.due_date, l.return_date,
            CASE WHEN l.return_date IS NULL THEN 'active' ELSE 'returned' END AS status
       FROM loans l
       JOIN books b ON b.id = l.book_id
      WHERE l.member_id = $1
      ORDER BY l.borrow_date DESC, l.id DESC`,
    [id]
  );
  return result.rows;
}

module.exports = { create, findById, loanHistory };
