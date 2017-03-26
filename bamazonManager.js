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

var start = function(){
	inquirer.prompt({
    name: "yoyo",
    type: "rawlist",
    message: "what you wanna do?",
    choices: ["View Products for Sale",
		"View Low Inventory",
		"Add to Inventory",
		"Add New Product"]
  }).then(function(answer) {

    if (answer.yoyo === "View Products for Sale"){
    	//console.log(answer.choice);
    	//console.log("gi");

    	connection.query("SELECT * FROM products", function(err, res) {
  for (var i = 0; i < res.length; i++) {
    console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].price + " | " +res[i].stock_quantity );
  
  console.log("-----------------------------------");
}
})


    }
    if (answer.yoyo === "View Low Inventory"){
    	//console.log("la");

    		connection.query("SELECT * FROM products", function(err, res) {
  for (var i = 0; i < res.length; i++) {
  	if (res[i].stock_quantity < 5) {
    console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].price + " | " +res[i].stock_quantity );
  
  console.log("-----------------------------------");
}
}
})


    }
    if (answer.yoyo === "Add to Inventory"){
    	//console.log(answer.choice);
    	console.log("3");
    	var addin = function(){

    			inquirer.prompt([{
			    name: "productsadd",
			    type: "input",
			    message: "which item you wanna add?",
					  },{
				name: "productsaddnum",
			    type: "input",
			    message: "how many you wanna add?",
					}
					]).then(function(answer) {

						connection.query("SELECT * FROM products WHERE product_name=?",[answer.productsadd],
						 function(err, res) {
						  if (err) throw err;
						  console.log(res[0].stock_quantity);
						  var unit = parseInt(res[0].stock_quantity)
						  connection.query("UPDATE products SET ? WHERE ?", [{
  							stock_quantity: unit + parseInt(answer.productsaddnum)
							}, {
							  product_name:answer.productsadd
							}], function(err, res) {
								//console.log(err);
							});
						  console.log("ok! added!")
						  	connection.query("SELECT * FROM products", function(err, res) {
							  for (var i = 0; i < res.length; i++) {
							    console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].price + " | " +res[i].stock_quantity );
							  
							  console.log("-----------------------------------");
							}
							})
						});

						//console.log(unit);
						//console.log(answer.productsadd + answer.productsaddnum);

						
                        



					  })
				}
		addin();

}

    if (answer.yoyo === "Add New Product"){
    	console.log("4");
    	var addnew = function(){

    			inquirer.prompt([{
			    name: "additemname",
			    type: "input",
			    message: "what item you wanna add?",
					  },{
				name: "additemprice",
			    type: "input",
			    message: "how much this item?",
					},{
				name: "additemquantity",
			    type: "input",
			    message: "how many you wanna add to this item?",
					},{
				name: "additemdepart",
			    type: "input",
			    message: "which department to this item?",
					},
					]).then(function(answer) {

						connection.query("INSERT INTO products SET ?", {
								  product_name: answer.additemname,
								  department_name: answer.additemdepart,
								  price: parseInt(answer.additemprice),
								  stock_quantity: parseInt(answer.additemquantity)
								}, function(err, res) {
									console.log("ok, add new item")
								});
					
				})


}

addnew();
    }
  // case "spotify-this-song":
  //   spotifythissong();
  //   break;

  // case "movie-this":
  //   moviethis();
  //   break;

  // case "do-what-it-says":
  //   dowhatitsays();
  //   break;

});
}

start();
    

