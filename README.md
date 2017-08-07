This file contains two programs that function with sql
	
******BOTH NPM INSTALL (INQUIRER AND SQL) ARE NEEDED FOR APP TO WORK********


#SQl.js which: 
	1.) prompts the user as to what item on the sql databse they want to buy
	2.) ask the user how many they want to buy
	3.) gives user the total for their purchase
	4.) updates the sql databse with the change 

	To run: enter "node SQL.js" into command prompt
		-Program will stop once it updates the database



#bamazonManager.js which:
	1.)starts by listing all of the possible commands functions that it has
	2.) function viewProducts() : lists all of the items in stock 
	3.)function viewProducts("check low") : list all the items that have less than 10 items in stock
	4.)function viewProducts("inventory"):  adds to the inventory of an item
	5.) function newProduct() adds an item to the sql databse


	To run: enter "node bamazonManager.js" into command line
		-program will keep running until the user selecs choice 5 which ends the program



------------------------sql Source Code---------------------------------

create DATABASE bamazon;
use bamazon;

select Product_name from products;


CREATE TABLE products (
 item_id INT(10) not null auto_increment,
 Product_name varchar(30) not null,
 department_name varchar(30),
 price int not null,
 stock_quantity int not null,
 primary key (item_id)
);

INSERT INTO products (Product_name, department_name, price, stock_quantity)
values ('Watch', 'user_products', 150, 10);
INSERT INTO products (Product_name, department_name, price, stock_quantity)
values ('mouse', 'electronics', 15, 10);
INSERT INTO products (Product_name, department_name, price, stock_quantity)
values ('phone_case', 'user_products', 20, 8);
INSERT INTO products (Product_name, department_name, price, stock_quantity)
values ('wallet', 'user_products', 30, 10);
INSERT INTO products (Product_name, department_name, price, stock_quantity)
values ('pen', 'supplies', 8, 20);
INSERT INTO products (Product_name, department_name, price, stock_quantity)
values ('staples', 'supplies', 5, 50);
INSERT INTO products (Product_name, department_name, price, stock_quantity)
values ('lamp', 'user_products', 15, 10);
INSERT INTO products (Product_name, department_name, price, stock_quantity)
values ('VAIO_laptop', 'electronics', 850, 5);
INSERT INTO products (Product_name, department_name, price, stock_quantity)
values ('water_bottle', 'user_products', 15, 20);
INSERT INTO products (Product_name, department_name, price, stock_quantity)
values ('iphone_6', 'electronics', 600, 12);
