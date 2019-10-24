// DATABASE
var mysql = require("mysql");

// INQUIRER
var inquirer = require("inquirer");

//EASY-TABLE
var easyTable = require('easy-table')

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
      superMenuOptions();
  });

  function superMenuOptions() {
      console.log("\n Bamazon Supervisor Workspace\n");
      inquirer
      .prompt ([
          {
              type: "list",
              message: " Please choose one of the following:",
              choices: [ " View Product Sales by Department", " Create New Department" ],
              name: "superMenu"
          }
      ])
      .then(function(response) {
          var superMenu = response.superMenu;
          if (superMenu == " View Product Sales by Department") {
            //   summarizedTable();
          }
        //   createNewDept();
      })
  }

  function summarizedTable() {
      
  }
  