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

  //MENU OPTIONS FUNCTION
function menuOptions() {
    console.log("\n Bamazon Inventory System");
    console.log(" ++++++++++++++++++++++++");
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
            //console.log("this works!")
            productsForSale();
            break;
        case "View Low Inventory":
            lowInventory();
            break;
        case "Add to Inventory":
            addInventory();
            break;
        case "Add New Product":
            addNewProduct();
            break;
        case "Exit":
            exitOrStay();
        }
    })
}

//PRODUCTS FOR SALE FUNCTION -- DISPLAYS ALL PRODUCT IN INVENTORY DATABASE
function productsForSale() {
    console.log("\n id  |        Product Name         |  Dept. Name |price  | qty");
    connection.query(
        "SELECT * FROM products",
        function(err, answer) {
            if (err) throw err;
            //console.log(res[0].item_id);
            for (var i = 0; i < answer.length; i++) {
                var results = answer[i];
                var itemID = results.item_id;
                var productName = results.product_name;
                var deptName = results.department_name;
                var price = results.price;
                var stockQuantity = results.stock_quantity;

                console.log(" * " + itemID + " | " + productName + " | " + deptName + " | " + price + " | " + stockQuantity + "\n");
            }
            exitOrStay();
        }
    )
}

//LOW INVENTORY FUNCTION -- CHECKS 'Products' TABLE FOR STOCK LEVELS LOWER THAN 6
function lowInventory() {
    console.log("\n Looks like it's time to reorder!\n");
    connection.query(
        "SELECT * FROM products WHERE stock_quantity <= 5",
        function(err, res) {
            if(err) throw err;
            for(var j = 0; j < res.length; j++) {
                var invResults = res[j];
                var lowInvItemID = invResults.item_id;
                var lowInvProductName = invResults.product_name;
                var lowInvDeptName = invResults.department_name;
                var lowInvPrice = invResults.price;
                var lowInvStockQuantity = invResults.stock_quantity;

                console.log(" * " + lowInvItemID + " | " + lowInvProductName + " | " + lowInvDeptName + " | " + lowInvPrice + " | " + lowInvStockQuantity + "\n");
            }
            exitOrStay();
        }
    );
}

//ADD INVENTORY FUNCTION -- ALLOWS USER TO INCREASE STOCK QUANTITIES
function addInventory () {
    console.log("\n Increase stock quantities\n")
    inquirer
    .prompt ([
        {
            type: "input",
            message: " Enter item ID",
            name: "itemID"
        },
        {
            type: "input",
            message: " Enter quantity",
            name: "quantity"
        }
    ])
    .then(function(response) {
        connection.query(
            "SELECT * FROM products WHERE item_id = '" + response.itemID + "'",
             function(err, res) {
                if (err) throw err; 
                var chosenID = response.itemID;
                var stringNum = response.quantity;
                var qtyNum = parseInt(stringNum, 10);
                var newQuantity = qtyNum + res[0].stock_quantity;
                var updateSql = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";
                var updateSqlData = [newQuantity, chosenID];
                connection.query(updateSql, updateSqlData, (error, results, fields) => {
                    if (error){
                    return console.error(error.message);
                    }
                    //console.log('Rows affected:', results.affectedRows);
                console.log("\n The stock quantity for item " + chosenID +  " is now " + newQuantity + "\n");
                exitOrStay();
                });
             }
        )
    })
}

//ADD NEW PRODUCT FUNCTION -- ALLOWS USER TO ADD A NEW ROW TO THE TABLE
function addNewProduct() {
    console.log("\n Add new product to store\n");
    inquirer
    .prompt([
        {
            type: "input",
            message: "Enter product name",
            name: "product_name"
        },
        {
            type: "input",
            message: "Enter department name",
            name: "department_name"
        },
        {
            type: "input",
            message: "Enter retail price",
            name: "price"
        },
        {
            type: "input",
            message: "Enter stock quantity",
            name: "quantity"
        }
    ])
    .then(function(response) {
        var insertProdName = response.product_name;
        var insertDeptName = response.department_name;
        var insertPrice = response.price;
        var insertQuantity = response.quantity;
        connection.query( 
            "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('" + insertProdName + "', '" + insertDeptName + "', '" + insertPrice + "', '" + insertQuantity + "' )",
            function(err, res) {
                if (err) throw err;
                if(res.affectedRows == true) {
                    console.log("\n New item has been successfully added\n");
                    exitOrStay();
                } 
            }    
        )   
    })
}

//EXIT OR STAY FUNCTION -- ALLOWS USER TO RETURN TO MAIN MENU OR EXIT PROGRAM 
 function exitOrStay() {
    inquirer
    .prompt([
    {
        type: "list",
        message: "Choose from the following: ",
        choices: ["Return to menu options", "Exit program"],
        name: "leave_PfS"
    }
    ])
    .then(function(response) {
        var pfsChoice = response.leave_PfS;
        if (pfsChoice == "Return to menu options") {
            menuOptions();
        } else {
            console.log("\n Thank you! \n Good bye.")
            connection.end();
        }
    })
}




