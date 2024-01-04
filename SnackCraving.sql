CREATE DATABASE IF NOT EXISTS sc_db;

USE sc_db;

#user role table (admin or customer/user)
CREATE TABLE IF NOT EXISTS user_role (
    role_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(15) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_UNICODE_CI;

#user table
CREATE TABLE IF NOT EXISTS users(
	user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	first_name VARCHAR(50) NOT NULL,
	middle_name VARCHAR(50),
	last_name VARCHAR(50) NOT NULL,
	username VARCHAR(25) NOT NULL UNIQUE,
	hashed_password VARCHAR(255) NOT NULL UNIQUE,
	email VARCHAR(100) NOT NULL UNIQUE,
	phone VARCHAR(15) NOT NULL UNIQUE,
	role_id INT,
	balance DECIMAL(10, 2) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (role_id) REFERENCES user_role(role_id) ON UPDATE CASCADE ON DELETE SET NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_UNICODE_CI;

#if product is available or unavailable
CREATE TABLE IF NOT EXISTS product_status(
	status_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	food_status VARCHAR(20) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_UNICODE_CI;

#category of product e.g. Burger, Fries
CREATE TABLE IF NOT EXISTS category(
	product_category_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	product_category VARCHAR(50) NOT NULL UNIQUE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#product table
CREATE TABLE IF NOT EXISTS product(
	product_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	product_name VARCHAR(100) UNIQUE NOT NULL,
	product_category_id INT,
	price DECIMAL(10, 2) NOT NULL,
	stock_quantity INT NOT NULL,
	status_id INT,
	FOREIGN KEY (status_id) REFERENCES product_status(status_id) ON UPDATE CASCADE ON DELETE SET NULL,
	FOREIGN KEY (product_category_id) REFERENCES category(product_category_id) ON UPDATE CASCADE ON DELETE SET NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_UNICODE_CI;

CREATE TABLE IF NOT EXISTS orders (
    order_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    product_id INT,
    quantity INT,
    total_amount DECIMAL(10, 2),
    amount_paid DECIMAL (10,2),
    change_amount DECIMAL (10, 2),
    date_ordered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_UNICODE_CI;

CREATE TABLE IF NOT EXISTS cart(
	cart_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	product_id INT,
	user_id INT,
	quantity INT NOT NULL,
	total_amount DECIMAL(10, 2),
	FOREIGN KEY (product_id) REFERENCES product(product_id) ON UPDATE CASCADE ON DELETE SET NULL,
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE SET NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_UNICODE_CI;

INSERT INTO user_role(role_name)
VALUES('Admin'), ('Customer');

INSERT INTO product_status(food_status)
VALUES ('Available'), ('Not available');

INSERT INTO category(product_category)
VALUES
('Burger'), 
('Fries'), 
('Pasta'), 
('Ice Cream'), 
('Tea'), 
('Drinks');

INSERT INTO orders (total_amount) VALUES (0.00);

INSERT INTO product(product_name, product_category_id, price, stock_quantity, status_id)
VALUES ('Cheeseburger', '1', 120.00, 150, '1'),
('Bacon-and-Kimchi', '1', 150.00, 150, '1'),
('Chicken Burger', '1', 135.00, 150, '1'),
('Surf and Turf Burger', '1', 180.00, 150, '1'),
('BBQ Bacon Burger', '1', 170.00, 150, '1'),
('Caprese Burger', '1', 195.00, 150, '1'),
('Straight Cut Fries', '2', 80.00, 180, '1'),
('Curly Fries', '2', 95.00, 180, '1'),
('Bacon Ranch Fries', '2', 125.00, 180, '1'),
('Spicy Sriracha Fries', '2', 135.00, 180, '1'),
('Buffalo Chicken Fries', '2', 150.00, 180, '1'),
('Loaded Nacho Fries', '2', 145.00, 180, '1'),
('Macaroni and Cheese', '3', 120.00, 120, '1'),
('Chicken & Spaghetti', '3', 130.00, 120, '1'),
('Carbonara', '3', 150.00, 120, '1'),
('Cajun Chicken Pasta', '3', 175.00, 120, '1'),
('Lasagna', '3', 160.00, 120, '1'),
('Fettuccine Alfredo', '3', 190.00, 120, '1'),
('Classic Hot Fudge', '4', 45.00, 100, '2'),
('Strawberry Delight', '4', 55.00, 100, '2'),
('Espresso Brownie', '4', 60.00, 100, '2'),
('Pistachio Almond', '4', 85.00, 100, '2'),
('Vanilla Dream', '4', 45.00, 100, '2'),
('Cookies and Cream', '4', 55.00, 100, '2'),
('Green Tea', '5', 110.00, 150, '1'),
('Vanilla Chai', '5', 120.00, 150, '1'),
('Matcha Latte', '5', 130.00, 150, '1'),
('Boba Tea', '5', 145.00, 150, '1'),
('Brown Sugar Milk Tea', '5', 135.00, 150, '1'),
('Thai Milk Tea', '5', 150.00, 150, '1'),
('Coke', '6', 50.00, 300, '1'),
('Coke Zero', '6', 60.00, 300, '1'),
('Pepsi', '6', 55.00, 300, '1'),
('Iced Coffee', '6', 75.00, 300, '1'),
('Caramel Macchiato', '6', 90.00, 300, '1'),
('Spanish Latte', '6', 105.00, 300, '1');

CREATE VIEW food_menu AS SELECT product_id, product_name, product_category, price, stock_quantity, food_status FROM product 
JOIN category ON product.product_category_id = category.product_category_id  JOIN product_status ON product.status_id = product_status.status_id;

CREATE VIEW app_users AS SELECT user_id, CONCAT_WS(" ", first_name, middle_name, last_name) AS full_name, username, hashed_password, email, phone, role_name, created_at, balance FROM users
LEFT JOIN user_role ON users.role_id = user_role.role_id;

CREATE VIEW user_cart AS 
SELECT 
    cart.cart_id,
    product.product_name,
    product.price,
    users.username,
    cart.quantity,
    product.price * cart.quantity AS total_amount
FROM 
    cart
LEFT JOIN 
    product ON cart.product_id = product.product_id 
LEFT JOIN 
    users ON cart.user_id = users.user_id;