select first_name, last_name, birth_date from students ORDER BY last_name DESC LIMIT 4;
select first_name, last_name, birth_date from students ORDER BY birth_date DESC LIMIT 1;
select first_name, last_name, birth_date from students ORDER BY id ASC OFFSET 2 LIMIT 3;