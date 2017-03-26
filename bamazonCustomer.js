var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "rodnicwest",
  database: "Bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

connection.query("SELECT * FROM products", function(err, res) {
  for (var i = 0; i < res.length; i++) {
    console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].price + " | " +res[i].stock_quantity );
  
  console.log("-----------------------------------");
}
});

var start = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    //console.log(res);
    inquirer.prompt([{
      name: "choice",
      type: "rawlist",
      choices: function(value) {
        var choiceArray = [];
        for (var i = 0; i < res.length; i++) {
          choiceArray.push(res[i].product_name);
        }
        return choiceArray;
      },
      message: "Which one would you like buy?"
    },{
    	name:"buyunit",
    	type:"input",
    	message:"How much you want to buy?"
    }]
    ).then(function(answer) {
    	console.log(answer.choice);
    	console.log(answer.buyunit);


       for (var i = 0; i < res.length; i++) {
         if (res[i].product_name === answer.choice) {
         	console.log(res[i].stock_quantity);
         	 if (res[i].stock_quantity > answer.buyunit){
         	 	console.log("you can buy it");
				connection.query("UPDATE products SET ? WHERE ?", [{
  							stock_quantity:res[i].stock_quantity - answer.buyunit
							}, {
							  product_name:res[i].product_name
							}], function(err, res) {
								console.log(err);
							});



         	 } else {
         	 	console.log("Insufficient quantity!");
         	 }
      //   	console.log(res[i].stock_quantity)
      //     var chosenItem = res[i];
      //     inquirer.prompt({
      //       name: "buy",
      //       type: "input",
      //       message: "How much would you like to buy?"
      //     }).then(function(answer) {
      //         console.log(answer.buy)
      //       })
        }
      //       else {
      //         console.log("Your bid was too low. Try again...");
              
             }
      //     };
        });
      });
}
start();


