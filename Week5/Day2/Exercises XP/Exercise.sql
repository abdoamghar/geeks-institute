--- Exercise 1:
SELECT * FROM items order by price ASC;
SELECT * FROM items WHERE price <= 80 ORDER BY price DESC;

SELECT first_name, last_name FROM customers ORDER BY last_name ASC LIMIT 3;
SELECT last_name FROM customers ORDER BY last_name DESC;

--- Exercise 2:

select * from customer;
select (first_name || ' ' || last_name) as full_name from customer;
select distinct create_date from customer;
select * from customer order by first_name desc;
select film_id, title, description, release_year, rental_rate from film ORDER BY rental_rate ASC;

SELECT address, phone
FROM address
WHERE district = 'Texas';

SELECT *
FROM film
WHERE film_id IN (15, 150);

SELECT film_id, title, description, length, rental_rate
FROM film
WHERE title = 'ACADEMY DINOSAUR';

SELECT film_id, title, description, length, rental_rate
FROM film
WHERE title LIKE 'AC%';

SELECT *
FROM film
ORDER BY rental_rate ASC
LIMIT 10;

SELECT *
FROM film
ORDER BY rental_rate ASC
LIMIT 10 OFFSET 10;

SELECT *
FROM (
    SELECT *,
           ROW_NUMBER() OVER (ORDER BY rental_rate ASC) AS row_num
    FROM film
) AS movies
WHERE row_num BETWEEN 11 AND 20;

SELECT
    customer.customer_id,
    customer.first_name,
    customer.last_name,
    payment.amount,
    payment.payment_date
FROM customer
JOIN payment
    ON customer.customer_id = payment.customer_id
ORDER BY customer.customer_id ASC;

SELECT film.*
FROM film
LEFT JOIN inventory
    ON film.film_id = inventory.film_id
WHERE inventory.inventory_id IS NULL;

SELECT
    city.city,
    country.country
FROM city
JOIN country
    ON city.country_id = country.country_id;