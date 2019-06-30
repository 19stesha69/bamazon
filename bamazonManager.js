// DATABASE
var mysql = require("mysql");

// INQUIRER
var inquirer = require("inquirer");

//CONNECTION INFO FOR SQL DATABASE
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "BBto2941",
    database: "bamazon_DB"
  });
  
  //CONNECTS MYSQL SERVER and SQL DATABASE
  connection.connect(function(err) {
      if (err) throw err;
      //console.log("connected as id " + connection.threadId + "\n");
      menuOptions();
  });

function menuOptions() {
    inquirer
    .prompt([
        {
            type: "list",
            message: "\n *Menu Options*",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"],
            name: "menu"
        }
    ])
    .then(function(response) {
        //console.log(response.menu);
        var menuChoice = response.menu;
        switch(menuChoice) {
        case "View Products for Sale":
            console.log("this works!")
            //productsForSale();
        case "View Low Inventory":
            //lowInventory();
        case "Add to Inventory":
            //addInventory();
        case "Add New Product":
            //addNewProduct();
        case "Exit":
            //exitApp();
        }
    })
}





