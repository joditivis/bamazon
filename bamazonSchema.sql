DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
	item_id INT(11) NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10, 2) NOT NULL,
	stock_quantity INT(20) NOT NULL,
	PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES (1, 'Airpods', 'Electronics', 267.00, 22), (2, 'MacBookAir', 'Electronics', 1200.45, 5), (3, 'iPhone11', 'Electronics', 900.50, 3), 
(4, 'Snowboards', 'MountainGear', 340.00, 15), (5, 'BoardBindings', 'MountainGear', 150.00, 20), (6, 'BoardingBoots', 'MountainGear', 213.25, 16), (7, 'SkiPasses', 'MountainGear', 115.00, 200), 
(8, 'Pillows', 'Bedding', 19.99, 12), (9, 'Blankets', 'Bedding', 29.99, 15), (10, 'Sheets', 'Bedding', 49.99, 9);