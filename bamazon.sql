DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(48) NOT NULL,
  department_name VARCHAR(48) NOT NULL,
  price DECIMAL(6, 2) NOT NULL,
  stock_quantity INT (4) NULL,
  product_sales DECIMAL (6, 2),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Luna Lovegood Spectrespects', 'pop culture', '13.95', '12'),
       ('Harry Potter Quidditch Goggles', 'pop culture', '19.95', '24'),
       ('Sunshine Daydream Milk Chocoalte Bar', 'candy', '8.00', '48'),
       ('Ghana 70% Dark Chocolate', 'candy', '4.00', '24'),
       ('All Booked Up Shopping Tote', 'accessories', '12.99', '12'),
       ('Unicorn Shopping Tote', 'accessories', '12.99', '12'),
       ('Beasties Mug', 'home and garden', '9.99', '8'),
       ('Beasties Swedish Dishcloth', 'home and garden', '12.99', '9'),
       ('Barbie Mermaid Enchantress Doll', 'toys', '79.99', '4'),
       ('Tonka Steel Classic Mighty Dump Truck', 'toys', '24.99', '10');
       

CREATE TABLE departments {
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR (48) NOT NULL,
  over_head_costs DECIMAL (6, 2) NOT NULL,
  PRIMARY KEY (department_id)
};

INSERT INTO departments (department_name, over_head_costs)
VALUES ('accessories', 10000),
       ('candy', 5000),
       ('home and garden', 10000),
       ('pop culture', 10000),
       ('toys', 10000);
