TRUNCATE TABLE loans, books, members RESTART IDENTITY CASCADE;

INSERT INTO books (title, author, category, total_copies, available_copies) VALUES
  ('Clean Code', 'Robert C. Martin', 'Programming', 3, 2),
  ('Database System Concepts', 'Abraham Silberschatz', 'Technology', 2, 1),
  ('Introduction to Algorithms', 'Thomas H. Cormen', 'Technology', 1, 0),
  ('The Art of Statistics', 'David Spiegelhalter', 'Mathematics', 2, 2),
  ('1984', 'George Orwell', 'Fiction', 3, 3),
  ('Node.js Design Patterns', 'Mario Casciaro', 'Programming', 2, 1),
  ('Dune', 'Frank Herbert', 'Fiction', 2, 2),
  ('Python Crash Course', 'Eric Matthes', 'Programming', 2, 1),
  ('Data Science from Scratch', 'Joel Grus', 'Technology', 2, 2),
  ('Operating Systems: Three Easy Pieces', 'Remzi Arpaci-Dusseau', 'Technology', 1, 1);

INSERT INTO members (full_name, email, join_date) VALUES
  ('Amina Diallo', 'amina@example.edu', CURRENT_DATE - 180),
  ('Leo Martin', 'leo@example.edu', CURRENT_DATE - 120),
  ('Maya Chen', 'maya@example.edu', CURRENT_DATE - 90),
  ('Noah Singh', 'noah@example.edu', CURRENT_DATE - 60),
  ('Sofia Garcia', 'sofia@example.edu', CURRENT_DATE - 30);

INSERT INTO loans (member_id, book_id, borrow_date, due_date, return_date) VALUES
  (1, 1, CURRENT_DATE - 10, CURRENT_DATE + 10, NULL),
  (1, 5, CURRENT_DATE - 40, CURRENT_DATE - 26, CURRENT_DATE - 30),
  (2, 2, CURRENT_DATE - 20, CURRENT_DATE - 5, NULL),
  (2, 7, CURRENT_DATE - 50, CURRENT_DATE - 36, CURRENT_DATE - 42),
  (3, 3, CURRENT_DATE - 5, CURRENT_DATE + 9, NULL),
  (3, 9, CURRENT_DATE - 35, CURRENT_DATE - 21, CURRENT_DATE - 25),
  (4, 6, CURRENT_DATE - 2, CURRENT_DATE + 12, NULL),
  (5, 8, CURRENT_DATE - 15, CURRENT_DATE - 1, NULL),
  (1, 1, CURRENT_DATE - 65, CURRENT_DATE - 51, CURRENT_DATE - 55);
