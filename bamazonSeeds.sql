DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Table","Furniture",14.99,3),("Chair","Furniture",4.99,12),
("Shirt","Clothing",5.00,20),("Pants","Clothing",19.99,13),("Hat","Clothing",2.99,21),
("Tongs","Utensils",1.99,40),("Ladle","Utensils",7.99,700),
("Ghouls and Goblins","Video-Game",4.99,10),("Black-Ops 9","Video-Game",59.99,50000),
("Tea 20 pack","Food",3.86,10);


-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);
