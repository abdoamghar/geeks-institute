--- Exercise 1:
-- Q1.1:
SELECT rating, COUNT(*) AS number_of_films
FROM film
GROUP BY rating;


-- Q1.2:
SELECT *
FROM film
WHERE rating IN ('G', 'PG-13');


-- Q1.2.1:
SELECT *
FROM film
WHERE rating IN ('G', 'PG-13')
  AND length < 120
  AND rental_rate < 3.00
ORDER BY title ASC;


-- Q1.3: 
SELECT *
FROM customer
LIMIT 1;

UPDATE customer
SET first_name = 'Abdelhamid',
    last_name = 'Amghar',
    email = 'abdelhamid@email.com'
WHERE customer_id = 1;


-- Q1.4:
SELECT address.*
FROM address
JOIN customer
    ON address.address_id = customer.address_id
WHERE customer.customer_id = 1;

UPDATE address
SET address = '25 Hassan II Street',
    district = 'Casablanca',
    postal_code = '20000',
    phone = '0646382669'
WHERE address_id = (
    SELECT address_id
    FROM customer
    WHERE customer_id = 1
);

--- Exercise 2:
-- UPDATE 1:
UPDATE students
SET birth_date = '1998-11-02'
WHERE first_name IN ('Lea', 'Marc')
  AND last_name = 'Benichou';


-- UPDATE 2:
UPDATE students
SET last_name = 'Guez'
WHERE first_name = 'David'
  AND last_name = 'Grez';


-- DELETE 1: 
DELETE FROM students
WHERE first_name = 'Lea'
  AND last_name = 'Benichou';


-- COUNT 1:
SELECT COUNT(*) AS total_students
FROM students;


-- COUNT 2: 
SELECT COUNT(*) AS students_born_after_2000
FROM students
WHERE birth_date > '2000-01-01';


-- INSERT / ALTER 1: 
ALTER TABLE students
ADD COLUMN math_grade INTEGER;


-- INSERT / ALTER 2: 
UPDATE students
SET math_grade = 80
WHERE id = 1;


-- INSERT / ALTER 3: 
UPDATE students
SET math_grade = 90
WHERE id IN (2, 4);


-- INSERT / ALTER 4: 
UPDATE students
SET math_grade = 40
WHERE id = 6;


-- INSERT / ALTER 5: 
SELECT COUNT(*) AS students_above_83
FROM students
WHERE math_grade > 83;


-- INSERT / ALTER 6: 
INSERT INTO students (first_name, last_name, birth_date, math_grade)
SELECT first_name, last_name, birth_date, 70
FROM students
WHERE first_name = 'Omer'
  AND last_name = 'Simpson'
LIMIT 1;


-- INSERT / ALTER 7 BONUS: 
SELECT first_name, last_name, COUNT(math_grade) AS total_grade
FROM students
GROUP BY first_name, last_name;


-- SUM 1: 
SELECT SUM(math_grade) AS total_grades
FROM students;

--- Exercise 3:
-- PART I - Q1: 
CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    item_id INTEGER REFERENCES items(id),
    quantity_purchased INTEGER
);


-- PART I - Q2.1: 
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers
     WHERE first_name = 'Scott' AND last_name = 'Scott'),

    (SELECT id FROM items
     WHERE name = 'Fan'),

    1
);


-- PART I - Q2.2: 
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers
     WHERE first_name = 'Melanie' AND last_name = 'Johnson'),

    (SELECT id FROM items
     WHERE name = 'Large Desk'),

    10
);


-- PART I - Q2.3: 
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers
     WHERE first_name = 'Greg' AND last_name = 'Jones'),

    (SELECT id FROM items
     WHERE name = 'Small Desk'),

    2
);


-- PART II - Q1.1: 
SELECT *
FROM purchases;

-- This only shows IDs and quantities, so it is not very useful by itself.


-- PART II - Q1.2:
SELECT *
FROM purchases
JOIN customers
ON purchases.customer_id = customers.id;


-- PART II - Q1.3: 
SELECT *
FROM purchases
WHERE customer_id = 5;


-- PART II - Q1.4: 
SELECT purchases.*
FROM purchases
JOIN items
ON purchases.item_id = items.id
WHERE items.name IN ('Large Desk', 'Small Desk');


-- PART II - Q2: 
SELECT
    customers.first_name,
    customers.last_name,
    items.name AS item_name
FROM purchases
JOIN customers
ON purchases.customer_id = customers.id
JOIN items
ON purchases.item_id = items.id;


-- PART II - Q3: 
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (1, NULL, 1);

-- Answer:
-- Yes, this works because item_id was not defined as NOT NULL.
-- A foreign key can contain NULL unless a NOT NULL constraint is added.