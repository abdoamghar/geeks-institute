SELECT COUNT(*) FROM actors;

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES ('John', NULL, NULL, 0);
--- outcome: error because last_name, age are NOT NULL