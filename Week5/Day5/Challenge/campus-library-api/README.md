# Campus Library API

An Express API backed by PostgreSQL. Loans are kept as history; borrowing and returning update copy counts in database transactions.

## Requirements

- Node.js 18 or newer
- PostgreSQL 12 or newer

## Set up

```powershell
cd campus-library-api
npm install
Copy-Item .env.example .env
```

Edit `.env` with your PostgreSQL credentials. Create a development database and a separate test database, for example:

```sql
CREATE DATABASE campus_library;
CREATE DATABASE campus_library_test;
```

Apply `sql/schema.sql` and `sql/seed.sql` to the development database, in that order. With `psql` installed:

```powershell
$env:DATABASE_URL = 'postgres://postgres:password@localhost:5432/campus_library'
psql $env:DATABASE_URL -f sql/schema.sql
psql $env:DATABASE_URL -f sql/seed.sql
npm start
```

The server listens at `http://127.0.0.1:3000` by default. `HOST` and `PORT` override the address and port. `DATABASE_URL` may be replaced with the standard PostgreSQL environment variables (`PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`). Re-running the seed script deletes and recreates sample records.

## Endpoints

All responses are JSON. Errors use `{ "error": "message" }`. IDs are positive integers. Dates use `YYYY-MM-DD`.

| Method | Path | Request / response |
| --- | --- | --- |
| GET | `/books?title=code&category=Programming` | List books. Title is a case-insensitive substring; category is a case-insensitive exact match. Both filters are optional. |
| GET | `/books/:id` | Get one book. |
| POST | `/books` | `{ "title": "...", "author": "...", "category": "...", "total_copies": 2 }`. All copies start available. |
| PATCH | `/books/:id` | Any nonempty subset of `title`, `author`, `category`. |
| DELETE | `/books/:id` | Delete only when there is no loan history. |
| POST | `/members` | `{ "full_name": "...", "email": "...", "join_date": "2026-10-03" }`. `join_date` is optional and defaults to the database's current date. Email is unique without regard to case. |
| GET | `/members/:id/loans` | Loan history with `book_title`, dates, and `status`. |
| POST | `/loans` | `{ "member_id": 1, "book_id": 1, "due_date": "2099-01-01" }`. The due date must be later than the database's current date. |
| PATCH | `/loans/:id/return` | Mark an active loan returned. |
| GET | `/reports/books` | All books with numeric `loan_count`, including zero. |
| GET | `/reports/overdue` | Active loans with a due date before today. |

Successful creation returns `201`. Successful reads, edits, returns, and deletes return `200`. Invalid input returns `400`; missing records return `404`; unavailable copies, repeated returns, duplicate emails, and books with loan history return `409`.

`available_copies` is managed by loans and cannot be edited directly. The schema also checks that it stays between zero and `total_copies`. Borrowing locks the book row, so only one transaction can claim the last copy. Returning updates an active loan conditionally and increments the book count in the same transaction. Any failure rolls the transaction back.

## Sample data

`sql/seed.sql` creates 10 books, 5 members, and 9 loans. *The Art of Statistics* has no loans. *Introduction to Algorithms* has no available copies. The loans include active, returned, and overdue records.

## Verify

Set `TEST_DATABASE_URL` in `.env` to a dedicated database whose name includes `test`, then run:

```powershell
npm test
```

The integration test resets that database. It starts the API on a temporary port and checks title and category search, zero-loan reporting, last-copy borrowing, refused borrows, returns, repeated returns, member history, missing records, unchanged data after failures, overdue reporting, deletion rules, and two simultaneous requests for one copy.
