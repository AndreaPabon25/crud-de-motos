CREATE DATABASE IF NOT EXISTS mydb;
USE mydb;

CREATE TABLE IF NOT EXISTS motos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    cilindraje INT NOT NULL,
    precio FLOAT NOT NULL
);

INSERT INTO motos (marca, modelo, cilindraje, precio) VALUES
('Yamaha', 'MT-07', 689, 42000.00),
('Kawasaki', 'Z650', 649, 39000.00),
('Honda', 'CB500F', 471, 37000.00);
