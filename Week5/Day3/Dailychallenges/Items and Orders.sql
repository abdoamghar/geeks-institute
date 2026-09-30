
CREATE TABLE product_orders (
    order_id SERIAL PRIMARY KEY,
    order_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    order_id INTEGER REFERENCES product_orders(order_id)
);

INSERT INTO product_orders DEFAULT VALUES;
INSERT INTO product_orders DEFAULT VALUES;

INSERT INTO items (name, price, order_id)
VALUES
    ('Laptop', 1000.00, 1),
    ('Mouse', 50.00, 1),
    ('Keyboard', 100.00, 1),
    ('Monitor', 300.00, 2);

CREATE OR REPLACE FUNCTION get_order_total(p_order_id INTEGER)
RETURNS DECIMAL(10, 2)
AS $$
DECLARE
    total DECIMAL(10, 2);
BEGIN
    SELECT COALESCE(SUM(price), 0)
    INTO total
    FROM items
    WHERE order_id = p_order_id;

    RETURN total;
END;
$$ LANGUAGE plpgsql;

SELECT get_order_total(1);


-- BONUS

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

ALTER TABLE product_orders
ADD COLUMN user_id INTEGER REFERENCES users(user_id);

INSERT INTO users (first_name, last_name)
VALUES
    ('John', 'Doe'),
    ('Jane', 'Smith');

UPDATE product_orders
SET user_id = 1
WHERE order_id = 1;

UPDATE product_orders
SET user_id = 2
WHERE order_id = 2;

CREATE OR REPLACE FUNCTION get_user_order_total(
    p_user_id INTEGER,
    p_order_id INTEGER
)
RETURNS DECIMAL(10, 2)
AS $$
DECLARE
    total DECIMAL(10, 2);
BEGIN
    SELECT COALESCE(SUM(items.price), 0)
    INTO total
    FROM product_orders
    JOIN items
    ON product_orders.order_id = items.order_id
    WHERE product_orders.user_id = p_user_id
    AND product_orders.order_id = p_order_id;

    RETURN total;
END;
$$ LANGUAGE plpgsql;

SELECT get_user_order_total(1, 1);