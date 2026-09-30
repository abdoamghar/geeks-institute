-- EXERCISE 1

-- 1
SELECT *
FROM rental
WHERE return_date IS NULL;

-- Answer: Rentals that are still out are identified by return_date being NULL.


-- 2
SELECT
    customer.customer_id,
    customer.first_name,
    customer.last_name,
    COUNT(rental.rental_id) AS outstanding_rentals
FROM customer
JOIN rental
ON customer.customer_id = rental.customer_id
WHERE rental.return_date IS NULL
GROUP BY customer.customer_id, customer.first_name, customer.last_name;


-- 3
-- Answer: Yes, the film_list view is a shortcut because it already contains
-- film information, category and actors.

SELECT title, category, actors
FROM film_list
WHERE category = 'Action'
AND actors ILIKE '%Joe Swank%';



-- EXERCISE 2

-- 1
SELECT
    store.store_id,
    city.city,
    country.country
FROM store
JOIN address
ON store.address_id = address.address_id
JOIN city
ON address.city_id = city.city_id
JOIN country
ON city.country_id = country.country_id;

SELECT COUNT(*) AS total_stores
FROM store;


-- 2
SELECT
    inventory.store_id,
    SUM(film.length) AS total_minutes,
    ROUND(SUM(film.length) / 60.0, 2) AS total_hours
FROM inventory
JOIN film
ON inventory.film_id = film.film_id
GROUP BY inventory.store_id;


-- 3
SELECT
    inventory.store_id,
    SUM(film.length) AS total_minutes,
    ROUND(SUM(film.length) / 60.0, 2) AS total_hours
FROM inventory
JOIN film
ON inventory.film_id = film.film_id
WHERE NOT EXISTS (
    SELECT 1
    FROM rental
    WHERE rental.inventory_id = inventory.inventory_id
    AND rental.return_date IS NULL
)
GROUP BY inventory.store_id;


-- 4
SELECT DISTINCT
    customer.customer_id,
    customer.first_name,
    customer.last_name,
    city.city
FROM customer
JOIN address
ON customer.address_id = address.address_id
JOIN city
ON address.city_id = city.city_id
WHERE city.city_id IN (
    SELECT address.city_id
    FROM store
    JOIN address
    ON store.address_id = address.address_id
);


-- 5
SELECT DISTINCT
    customer.customer_id,
    customer.first_name,
    customer.last_name,
    country.country
FROM customer
JOIN address
ON customer.address_id = address.address_id
JOIN city
ON address.city_id = city.city_id
JOIN country
ON city.country_id = country.country_id
WHERE country.country_id IN (
    SELECT city.country_id
    FROM store
    JOIN address
    ON store.address_id = address.address_id
    JOIN city
    ON address.city_id = city.city_id
);


-- 6
SELECT
    SUM(film.length) AS safe_total_minutes
FROM film
WHERE film.film_id NOT IN (
    SELECT film_category.film_id
    FROM film_category
    JOIN category
    ON film_category.category_id = category.category_id
    WHERE category.name = 'Horror'
)
AND LOWER(film.title) NOT LIKE '%beast%'
AND LOWER(film.title) NOT LIKE '%monster%'
AND LOWER(film.title) NOT LIKE '%ghost%'
AND LOWER(film.title) NOT LIKE '%dead%'
AND LOWER(film.title) NOT LIKE '%zombie%'
AND LOWER(film.title) NOT LIKE '%undead%'
AND LOWER(film.description) NOT LIKE '%beast%'
AND LOWER(film.description) NOT LIKE '%monster%'
AND LOWER(film.description) NOT LIKE '%ghost%'
AND LOWER(film.description) NOT LIKE '%dead%'
AND LOWER(film.description) NOT LIKE '%zombie%'
AND LOWER(film.description) NOT LIKE '%undead%';


-- 7

-- General list
SELECT
    SUM(film.length) AS total_minutes,
    ROUND(SUM(film.length) / 60.0, 2) AS total_hours,
    ROUND(SUM(film.length) / 1440.0, 2) AS total_days
FROM inventory
JOIN film
ON inventory.film_id = film.film_id
WHERE NOT EXISTS (
    SELECT 1
    FROM rental
    WHERE rental.inventory_id = inventory.inventory_id
    AND rental.return_date IS NULL
);


-- Safe list
SELECT
    SUM(film.length) AS total_minutes,
    ROUND(SUM(film.length) / 60.0, 2) AS total_hours,
    ROUND(SUM(film.length) / 1440.0, 2) AS total_days
FROM inventory
JOIN film
ON inventory.film_id = film.film_id
WHERE NOT EXISTS (
    SELECT 1
    FROM rental
    WHERE rental.inventory_id = inventory.inventory_id
    AND rental.return_date IS NULL
)
AND film.film_id NOT IN (
    SELECT film_category.film_id
    FROM film_category
    JOIN category
    ON film_category.category_id = category.category_id
    WHERE category.name = 'Horror'
)
AND LOWER(film.title) NOT LIKE '%beast%'
AND LOWER(film.title) NOT LIKE '%monster%'
AND LOWER(film.title) NOT LIKE '%ghost%'
AND LOWER(film.title) NOT LIKE '%dead%'
AND LOWER(film.title) NOT LIKE '%zombie%'
AND LOWER(film.title) NOT LIKE '%undead%'
AND LOWER(film.description) NOT LIKE '%beast%'
AND LOWER(film.description) NOT LIKE '%monster%'
AND LOWER(film.description) NOT LIKE '%ghost%'
AND LOWER(film.description) NOT LIKE '%dead%'
AND LOWER(film.description) NOT LIKE '%zombie%'
AND LOWER(film.description) NOT LIKE '%undead%';