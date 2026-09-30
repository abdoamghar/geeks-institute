-- PART I

CREATE TABLE customer (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE customer_profile (
    id SERIAL PRIMARY KEY,
    isLoggedIn BOOLEAN DEFAULT FALSE,
    customer_id INTEGER UNIQUE REFERENCES customer(id)
);

INSERT INTO customer (first_name, last_name)
VALUES
    ('John', 'Doe'),
    ('Jerome', 'Lalu'),
    ('Lea', 'Rive');

INSERT INTO customer_profile (isLoggedIn, customer_id)
VALUES (
    TRUE,
    (SELECT id
     FROM customer
     WHERE first_name = 'John' AND last_name = 'Doe')
);

INSERT INTO customer_profile (isLoggedIn, customer_id)
VALUES (
    FALSE,
    (SELECT id
     FROM customer
     WHERE first_name = 'Jerome' AND last_name = 'Lalu')
);

SELECT customer.first_name
FROM customer
INNER JOIN customer_profile
ON customer.id = customer_profile.customer_id
WHERE customer_profile.isLoggedIn = TRUE;

SELECT
    customer.first_name,
    customer_profile.isLoggedIn
FROM customer
LEFT JOIN customer_profile
ON customer.id = customer_profile.customer_id;

SELECT COUNT(*) AS not_logged_in
FROM customer
LEFT JOIN customer_profile
ON customer.id = customer_profile.customer_id
WHERE customer_profile.isLoggedIn = FALSE
   OR customer_profile.isLoggedIn IS NULL;


-- PART II

CREATE TABLE book (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL
);

INSERT INTO book (title, author)
VALUES
    ('Alice In Wonderland', 'Lewis Carroll'),
    ('Harry Potter', 'J.K Rowling'),
    ('To kill a mockingbird', 'Harper Lee');

CREATE TABLE student (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    age INTEGER CHECK (age <= 15)
);

INSERT INTO student (name, age)
VALUES
    ('John', 12),
    ('Lera', 11),
    ('Patrick', 10),
    ('Bob', 14);

CREATE TABLE library (
    book_fk_id INTEGER,
    student_fk_id INTEGER,
    borrowed_date DATE,
    
    PRIMARY KEY (book_fk_id, student_fk_id),

    FOREIGN KEY (book_fk_id)
        REFERENCES book(book_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (student_fk_id)
        REFERENCES student(student_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO library (book_fk_id, student_fk_id, borrowed_date)
VALUES (
    (SELECT book_id
     FROM book
     WHERE title = 'Alice In Wonderland'),

    (SELECT student_id
     FROM student
     WHERE name = 'John'),

    '2022-02-15'
);

INSERT INTO library (book_fk_id, student_fk_id, borrowed_date)
VALUES (
    (SELECT book_id
     FROM book
     WHERE title = 'To kill a mockingbird'),

    (SELECT student_id
     FROM student
     WHERE name = 'Bob'),

    '2021-03-03'
);

INSERT INTO library (book_fk_id, student_fk_id, borrowed_date)
VALUES (
    (SELECT book_id
     FROM book
     WHERE title = 'Alice In Wonderland'),

    (SELECT student_id
     FROM student
     WHERE name = 'Lera'),

    '2021-05-23'
);

INSERT INTO library (book_fk_id, student_fk_id, borrowed_date)
VALUES (
    (SELECT book_id
     FROM book
     WHERE title = 'Harry Potter'),

    (SELECT student_id
     FROM student
     WHERE name = 'Bob'),

    '2021-08-12'
);

SELECT *
FROM library;

SELECT
    student.name,
    book.title
FROM library
JOIN student
ON library.student_fk_id = student.student_id
JOIN book
ON library.book_fk_id = book.book_id;

SELECT AVG(student.age) AS average_age
FROM library
JOIN student
ON library.student_fk_id = student.student_id
JOIN book
ON library.book_fk_id = book.book_id
WHERE book.title = 'Alice In Wonderland';

DELETE FROM student
WHERE name = 'John';

-- Answer: John's records are automatically deleted from the Library table
-- because the foreign key uses ON DELETE CASCADE.

SELECT *
FROM library;