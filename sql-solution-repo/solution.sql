-- solution.sql
-- Demonstrates hands-on SQL proficiency for a simple inventory system

CREATE TABLE IF NOT EXISTS products (
    product_id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(64) UNIQUE NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    warehouse VARCHAR(100),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert multiple rows
INSERT INTO products (product_id, name, sku, quantity, price, warehouse) VALUES
(1, 'AA Batteries (Pack of 4)', 'AA-4PK', 150, 4.99, 'Main Warehouse'),
(2, 'USB-C Cable 1m', 'USB-C-1M', 80, 7.50, 'Main Warehouse'),
(3, 'Wireless Mouse', 'MOUSE-WL', 45, 19.99, 'Secondary Warehouse'),
(4, 'Mechanical Keyboard', 'KB-MECH', 20, 49.99, 'Secondary Warehouse'),
(5, 'HDMI Cable 2m', 'HDMI-2M', 0, 9.99, 'Main Warehouse'),
(6, 'Obsolete Gadget', 'OLD-GADGET', 0, 1.00, 'Secondary Warehouse');

-- Basic select (show everything)
SELECT * FROM products;

-- Select with filtering and sorting: items in stock, sorted by quantity desc then price asc
SELECT product_id, name, sku, quantity, price
FROM products
WHERE quantity > 0
ORDER BY quantity DESC, price ASC;

-- Low-stock items (notify reorder) - sorted ascending by quantity
SELECT product_id, name, quantity
FROM products
WHERE quantity <= 20
ORDER BY quantity ASC;

-- Price-range query with sorting
SELECT name, price
FROM products
WHERE price BETWEEN 5.00 AND 30.00
ORDER BY price DESC;

-- UPDATE: receive new shipment for HDMI cables
UPDATE products
SET quantity = quantity + 50,
    last_updated = CURRENT_TIMESTAMP
WHERE sku = 'HDMI-2M';

-- DELETE: remove discontinued/obsolete items (example deletes the inserted obsolete product)
DELETE FROM products
WHERE sku = 'OLD-GADGET' AND quantity = 0;

-- Final state check
SELECT * FROM products ORDER BY product_id;
