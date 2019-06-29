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
      inventory();
  });
  

 //INVENTORY FUNCTION  -- Shows inventory on hand
function inventory () {
    console.log("\nWelcome to BAM!azon!!! Let's spend some MONEY$$$\n\n");
    console.log(" id  |        Product Name         |  Dept. Name |price  | qty");
    connection.query(
        "SELECT * FROM products",
        function(err, res) {
            if (err) throw err;
            //console.log(res[0].item_id);
            for (var i = 0; i < res.length; i++) {
                var results = res[i];
                var itemID = results.item_id;
                var productName = results.product_name;
                var deptName = results.department_name;
                var price = results.price;
                var stockQuantity = results.stock_quantity;

                console.log(" * " + itemID + " | " + productName + " | " + deptName + " | " + price + " | " + stockQuantity + "\n");
            }
            placeAnOrder();
        }
    )
}

//placeAnOrder FUNCTION -- Takes users order
function placeAnOrder () {
    inquirer
    .prompt ([
        {
            type: "input",
            message: "Enter item ID",
            name: "itemID"
        },
        {
            type: "input",
            message: "Enter quantity",
            name: "quantity"
        }
    ])
    .then(function(response) {
        connection.query (
            "SELECT * FROM products WHERE item_id = '" + response.itemID + "'",
             function(err, res) {
                if (err) throw err; 
                if (res[0].stock_quantity < response.quantity) {
                    console.log("\nSorry! Stock level is too low to fulfill your order.");
                    // reorder();
                } else {
                    console.log("We're fulfilling your order.");
                    var newQuantity = res[0].stock_quantity - response.quantity;
                    "UPDATE products SET stock_quantity=" + newQuantity + " WHERE item_id=" + response.itemID,
                    console.log(newQuantity);
                    console.log(connection);

                }
           }
        )
    })
}