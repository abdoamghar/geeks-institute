CREATE DATABASE bootcamp;

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL
);

INSERT INTO students (first_name, last_name, birth_date) VALUES
('Marc', 'Benichou', '1990-01-01'),
('Jane', 'Smith', '1992-02-02'),
('Alice', 'Johnson', '1994-03-03'),
('Bob', 'Brown', '1996-04-04'),
('Charlie', 'Davis', '1998-05-05'),
('Eve', 'Miller', '2000-06-06');

insert into students (first_name, last_name, birth_date) values
('Abdelhamid', 'Amghar', '2002-06-04');

select * from students;
select first_name, last_name from students;
select first_name, last_name from students WHERE id = 2;
select first_name, last_name from students WHERE first_name = 'Marc' AND last_name = 'Benichou';
select first_name, last_name from students WHERE first_name = 'Marc' OR last_name = 'Benichou';
select first_name, last_name from students WHERE first_name LIKE '%a%';
select first_name, last_name from students WHERE first_name LIKE 'A%';
select first_name, last_name from students WHERE first_name LIKE '%a';
select first_name, last_name from students WHERE SUBSTRING(first_name, LENGTH(first_name) - 1, 1) = 'a';
select first_name, last_name from students WHERE id IN (1, 3);
select * from students WHERE birth_date >= '2000-01-01';
