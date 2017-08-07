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


function start() {
	connection.connect(function(err) {
  		if (err) throw err;
	  	console.log("connected as id " + connection.threadId);

	  	connection.query("select Product_name from products", function(err, res) {
	    	
	    	ask(res);
	    
	  });
	});
};


start();

function ask(data) {
	inquirer
		.prompt([{
			name:"id",
			type:"rawlist",
			message: "what item whould you like to buy",
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
			message: "how many would you like to buy?"
		}])
		.then (function(answer) {
			var name = answer.id;
			var numberSold = answer.amount;
			check(name,numberSold);
		});

}


function check(name, amountSold) {
	connection.query("SELECT stock_quantity FROM products WHERE ?",
		{
			Product_name: name
		},
		function(err, results) {
			var stockAmount = results[0].stock_quantity;
			if (stockAmount > amountSold) {
				console.log("order accepted");
				update(name, amountSold, stockAmount)
				true 
			} else {
				console.log("order declined:");
				console.log("only: " + stockAmount + " units left in stock");
				false
				connection.end();

			}
		});
};

function update(name, amountSold, inStock) {
	connection.query("UPDATE products set ? WHERE ?",
		[{
			stock_quantity: (inStock - amountSold) 
		},{
			Product_name: name
		}],
		function(err,results) {
			// console.log(results)
			console.log(amountSold +" items sold");
			findPrice(name, amountSold);
		});
};

function findPrice(name, amountSold) {
	var total = 0;
	connection.query("SELECT price FROM products WHERE ?",
		{
			Product_name: name
		},
		function(err, results) {
			price = results[0].price;
			total = price * amountSold
			console.log("your total is: "+ total +"$")
			connection.end();
		});

};