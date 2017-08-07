var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  //var Your username
  user: "root",

  // Your password
  password: "10654655",
  database: "bamazon"
});
start();
function start() {
	connection.connect(function(err) {
		if (err) {
			console.log(err)
		}
		console.log( "connected as id: " + connection.threadId);
		
		ask();
	});
};

function ask() {
	inquirer.prompt({
		name:"choices",
		type: "rawlist",
		message:"Hello, What would you like to do?",
		choices: [
			"view products for Sale",
			"check for low inventory",
			"add to inventory",
			"add new product",
			"end App"
		]
	}) .then (function(answers) {
		switch (answers.choices) {
			case"view products for Sale":
				viewProducts();
				break;
			case"check for low inventory":
				viewProducts("check low");
				break;
			case"add to inventory":
				viewProducts("inventory");
				break;
			case"add new product":
				newProduct();
				break;
			case"end App":
				connection.end();
				break;
		}
	});
}


function viewProducts (insideFunction) {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) {
			console.log(err);
		}
		switch(insideFunction) {
			case "check low":
				console.log("The following items are low on stock")
				console.log("====================================")
				for (i=0; i < res.length ; i++) {
					if (res[i].stock_quantity < 10) {
						console.log("name: " + res[i].Product_name + " || In stock: " +res[i].stock_quantity);
					}
				}
				ask();
				break;
			case "inventory" :
				listItems(res);

				
				break;
			default:
				for (i=0; i< res.length; i++) {
					console.log("id: " + res[i].item_id +"|| name: " + res[i].Product_name + " || price: " + res[i].price + " || In stock: " +res[i].stock_quantity);
				}
				ask();
				break;
			 		
		}

	});
};


function listItems(data) {
	console.log("listing items");
	inquirer
		.prompt([{
			name:"item",
			type:"rawlist",
			message: "what item whould you like to add inventory too?",
			choices: [
			data[0].Product_name, 
			data[1].Product_name,
			data[2].Product_name, 
			data[3].Product_name,
			data[4].Product_name, 
			data[5].Product_name,
			data[6].Product_name, 
			data[7].Product_name,
			data[8].Product_name, 
			data[9].Product_name,
			]},{
			name: "amount",
			type: "input",
			message: "how many items are you adding to inventory?"
		}])
		.then (function(answer) {
			for (i=0; i < data.length ;i++) {
				if (answer.item == data[i].Product_name){
					var inStock = data[i].stock_quantity
				};
			}

			var name = answer.item;
			var amountAdded = answer.amount;
			console.log(name + " "  + inStock + " " + amountAdded  )
			addInventory(name, amountAdded, inStock);
			ask();
			
		});
}
function addInventory(itemName, amountAdded, inStock) {
	connection.query("UPDATE products set ? WHERE ?",
	 [{
	 	stock_quantity: (inStock + amountAdded)
	 },{
	 	Product_name: itemName
	 }], 
		function(err, results) {
			if (err) {
				console.log(err);
			}
			// console.log(results);
			console.log("sucess!!");
			console.log(amountAdded +" "+ itemName +"  have been added to stock" );

	});
};


function newProduct() {
	inquirer
		.prompt([{
			name:"name",
			type:"input",
			message: "What's the name of item your adding?"
			},{
			name: "department",
			type: "input",
			message: "What department does your item belong to?"
			},{
			name:"price",
			type:"input",
			message: "What's the price of the item?"
			},{
			name: "amount",
			type: "input",
			message: "How many items are you adding to stock?"
			}])
		.then(function(answer) {
			var itemData = "('"+ answer.name+ "', '" + answer.department + "' , " + answer.price +", " + answer.amount   + ");" ;
			console.log(itemData)
			connection.query("INSERT INTO products (Product_name, department_name, price, stock_quantity) VALUES" + itemData, 
			function(err, res) {
				if (err) {
					console.log(err);
				}
				
				console.log(res);
				console.log("succes item: " + answer.name + " added to stock")
			});

			ask()
		})
}
// create inquire promp with all the options
// run the correct funtion depending on the command
// 1.)view prodicts for sale
// 2.) view low inventory
// 3.)add to inventory
// 4.)add new product
// 5.) end app