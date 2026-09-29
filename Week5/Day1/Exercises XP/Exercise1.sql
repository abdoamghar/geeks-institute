CREATE DATABASE public;

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL
);

INSERT INTO items (name, price) VALUES
('Small Desk', 100),
('Large Desk', 300),
('fan', 80);

INSERT INTO customers (first_name, last_name) VALUES
('John', 'Doe'),
('Jane', 'jones'),
('Alice', 'Johnson'),
('Bob', 'Brown'),
('Charlie', 'jones');

select * from items;
select * from items where price > 80;
select * from items where price < 300;

select * from customers where last_name LIKE 'smith'; --- outcome is empty because there is no customer with last name 'smith'
select * from customers where last_name LIKE 'jones';
select * FROM customers where first_name NOT ILIKE 'john';