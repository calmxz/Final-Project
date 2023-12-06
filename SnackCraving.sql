CREATE DATABASE IF NOT EXISTS sc_db;

USE sc_db;

#user role table (admin or customer/user)
CREATE TABLE IF NOT EXISTS user_role (
    role_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(10) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_UNICODE_CI;

#user table
CREATE TABLE IF NOT EXISTS users(
	user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	first_name VARCHAR(50) NOT NULL,
	middle_name VARCHAR(50),
	last_name VARCHAR(50) NOT NULL,
	username VARCHAR(25) NOT NULL UNIQUE,
	hashed_password VARCHAR(255) NOT NULL UNIQUE,
	phone VARCHAR(15) NOT NULL UNIQUE,
	role_id INT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (role_id) REFERENCES user_role(role_id) ON UPDATE CASCADE ON DELETE SET NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_UNICODE_CI;

#if product is available or unavailable
CREATE TABLE IF NOT EXISTS product_status(
	status_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	food_status VARCHAR(20) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#product table
CREATE TABLE IF NOT EXISTS product(
	product_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	product_name VARCHAR(100) UNIQUE NOT NULL,
	price DECIMAL(10, 2),
	stock_quantity INT NOT NULL,
	status_id INT,
	FOREIGN KEY (status_id) REFERENCES product_status(status_id) ON UPDATE CASCADE ON DELETE SET NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#order of customers
CREATE TABLE IF NOT EXISTS orders(
	order_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	total_amount DECIMAL(10, 2),
	date_ordered TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#past transactions/successful transactions
CREATE TABLE IF NOT EXISTS transactions(
	transaction_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	order_id INT,
	product_id INT,
	user_id INT,
	quantity INT NOT NULL,
	amount_paid DECIMAL(10, 2),
	subtotal DECIMAL(10, 2),
	change_amount DECIMAL(10, 2),
	date_ordered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (order_id) REFERENCES orders(order_id) ON UPDATE CASCADE ON DELETE SET NULL,
	FOREIGN KEY (product_id) REFERENCES product(product_id) ON UPDATE CASCADE ON DELETE SET NULL,
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE SET NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_UNICODE_CI;

INSERT INTO user_role(role_name)
VALUES('admin'), ('customer');

INSERT INTO orders (total_amount) VALUES (0.00);
