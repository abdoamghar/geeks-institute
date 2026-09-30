-- EXERCISE 1

-- 1
SELECT DISTINCT
    film.film_id,
    film.title,
    film.rating
FROM film
JOIN inventory
ON film.film_id = inventory.film_id
WHERE film.rating IN ('G', 'PG')
AND NOT EXISTS (
    SELECT 1
    FROM rental
    WHERE rental.inventory_id = inventory.inventory_id
    AND rental.return_date IS NULL
);


-- 2
-- Answer: The waiting list should reference inventory because children
-- are waiting for a specific DVD copy. We can also reference customer
-- if the child is registered as a customer.

CREATE TABLE waiting_list (
    waiting_id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customer(customer_id),
    inventory_id INTEGER REFERENCES inventory(inventory_id),
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 3

INSERT INTO waiting_list (customer_id, inventory_id)
VALUES
    (1, 1),
    (2, 1),
    (3, 2),
    (4, 2),
    (5, 2);


SELECT
    film.title,
    inventory.inventory_id,
    COUNT(waiting_list.waiting_id) AS people_waiting
FROM waiting_list
JOIN inventory
ON waiting_list.inventory_id = inventory.inventory_id
JOIN film
ON inventory.film_id = film.film_id
WHERE film.rating IN ('G', 'PG')
GROUP BY film.title, inventory.inventory_id
ORDER BY people_waiting DESC;