-- EXERCISE 1

SELECT *
FROM language;

SELECT
    film.title,
    film.description,
    language.name
FROM film
JOIN language
ON film.language_id = language.language_id;

SELECT
    film.title,
    film.description,
    language.name
FROM language
LEFT JOIN film
ON language.language_id = film.language_id;

CREATE TABLE new_film (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO new_film (name)
VALUES
    ('The Last Journey'),
    ('Ocean Adventure'),
    ('Mystery Night');

CREATE TABLE customer_review (
    review_id SERIAL PRIMARY KEY,
    film_id INTEGER REFERENCES new_film(id) ON DELETE CASCADE,
    language_id INTEGER REFERENCES language(language_id),
    title VARCHAR(255),
    score INTEGER CHECK (score BETWEEN 1 AND 10),
    review_text TEXT,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO customer_review
    (film_id, language_id, title, score, review_text)
VALUES
    (
        (SELECT id FROM new_film WHERE name = 'The Last Journey'),
        (SELECT language_id FROM language WHERE name = 'English'),
        'Great Movie',
        9,
        'I really enjoyed this movie.'
    ),
    (
        (SELECT id FROM new_film WHERE name = 'Ocean Adventure'),
        (SELECT language_id FROM language WHERE name = 'English'),
        'Good Movie',
        8,
        'A fun and interesting movie.'
    );

DELETE FROM new_film
WHERE name = 'The Last Journey';

SELECT *
FROM customer_review;


-- EXERCISE 2

UPDATE film
SET language_id = (
    SELECT language_id
    FROM language
    WHERE name = 'French'
)
WHERE film_id IN (1, 2);

SELECT
    tc.constraint_name,
    kcu.column_name,
    ccu.table_name AS referenced_table,
    ccu.column_name AS referenced_column
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
ON tc.constraint_name = ccu.constraint_name
WHERE tc.table_name = 'customer'
AND tc.constraint_type = 'FOREIGN KEY';

DROP TABLE customer_review;

SELECT COUNT(*)
FROM rental
WHERE return_date IS NULL;

SELECT
    film.title,
    film.replacement_cost
FROM rental
JOIN inventory
ON rental.inventory_id = inventory.inventory_id
JOIN film
ON inventory.film_id = film.film_id
WHERE rental.return_date IS NULL
ORDER BY film.replacement_cost DESC
LIMIT 30;

SELECT DISTINCT
    film.title
FROM film
JOIN film_actor
ON film.film_id = film_actor.film_id
JOIN actor
ON film_actor.actor_id = actor.actor_id
WHERE film.description ILIKE '%sumo%'
AND actor.first_name = 'PENELOPE'
AND actor.last_name = 'MONROE';

SELECT
    title,
    description,
    length,
    rating
FROM film
WHERE length < 60
AND rating = 'R';

SELECT DISTINCT
    film.title
FROM customer
JOIN rental
ON customer.customer_id = rental.customer_id
JOIN inventory
ON rental.inventory_id = inventory.inventory_id
JOIN film
ON inventory.film_id = film.film_id
JOIN payment
ON rental.rental_id = payment.rental_id
WHERE customer.first_name = 'MATTHEW'
AND customer.last_name = 'MAHAN'
AND payment.amount > 4.00
AND rental.return_date BETWEEN '2005-07-28' AND '2005-08-01 23:59:59';

SELECT DISTINCT
    film.title,
    film.description,
    film.replacement_cost
FROM customer
JOIN rental
ON customer.customer_id = rental.customer_id
JOIN inventory
ON rental.inventory_id = inventory.inventory_id
JOIN film
ON inventory.film_id = film.film_id
WHERE customer.first_name = 'MATTHEW'
AND customer.last_name = 'MAHAN'
AND (
    film.title ILIKE '%boat%'
    OR film.description ILIKE '%boat%'
)
ORDER BY film.replacement_cost DESC;