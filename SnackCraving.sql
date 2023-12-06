CREATE DATABASE IF NOT EXISTS sc_db;

USE sc_db;

CREATE TABLE IF NOT EXISTS users(
	user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	first_name VARCHAR(50) NOT NULL,
	middle_name VARCHAR(50),
	last_name VARCHAR(50) NOT NULL,
	username VARCHAR(25) NOT NULL UNIQUE,
	hashed_password VARCHAR(255) NOT NULL,
	phone VARCHAR(15) NOT NULL,
	role_id INT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (role_id) REFERENCES user_role(role_id) ON UPDATE CASCADE ON DELETE SET NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS user_role (
    role_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(10) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS product(
	product_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	product_name VARCHAR(100) UNIQUE NOT NULL,
	status_id INT,
	FOREIGN KEY (status_id) REFERENCES product_status(status_id) ON UPDATE CASCADE ON DELETE SET NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS product_status(
	status_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	food_status VARCHAR(20) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS orders(
	order_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS transactions(
	transaction_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	order_id INT,
	product_id INT,
	user_id INT,
	quantity INT NOT NULL,
	amount_paid DECIMAL(10, 2) NOT NULL,
	total_amount DECIMAL(10, 2),
	FOREIGN KEY (order_id) REFERENCES user_role(role_id) ON UPDATE CASCADE ON DELETE SET NULL,
	FOREIGN KEY (product_id) REFERENCES product(product_id) ON UPDATE CASCADE ON DELETE SET NULL,
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE SET NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_UNICODE_CI;
