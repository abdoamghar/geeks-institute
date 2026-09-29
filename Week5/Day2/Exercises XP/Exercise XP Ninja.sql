-- Q1: 
SELECT first_name, last_name
FROM customers
ORDER BY last_name DESC, first_name DESC
LIMIT 2;


-- Q2: 
DELETE FROM purchases
WHERE customer_id = (
    SELECT id
    FROM customers
    WHERE first_name = 'Scott'
    AND last_name = 'Scott'
);


-- Q3: 
SELECT *
FROM customers
WHERE first_name = 'Scott'
AND last_name = 'Scott';

-- Answer: Yes, Scott still exists.
-- We only deleted his purchases, not Scott from the customers table.


-- Q4: 
-- Use LEFT JOIN
SELECT
    purchases.*,
    customers.first_name,
    customers.last_name
FROM purchases
LEFT JOIN customers
ON purchases.customer_id = customers.id;


-- Q5: 
-- Use INNER JOIN
SELECT
    purchases.*,
    customers.first_name,
    customers.last_name
FROM purchases
INNER JOIN customers
ON purchases.customer_id = customers.id;