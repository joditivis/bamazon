var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "17Idoj1995",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("connected as id " + connection.threadId);
});

// cli-table function to display products in an organized format
function displayProducts() {
    // variable for later refrencing the selection from our MySQL "products" table
    var query = "SELECT * FROM products";

    connection.query(query, function(err, resp) {
        if(err) throw err;

        var displayTable = new table ({
            head: ["Item ID", "Product", "Category", "Price", "Quantity"],
            colWidths: [10, 25, 25, 10, 14]
        });

        for (var i = 0; i < resp.length; i++){
            displayTable.push([resp[i].item_id, resp[i].product_name, resp[i].department_name, resp[i].price, resp[i].stock_quantity]);
        }
        console.log(displayTable.toString());
        purchasePrompt();
    });
}

function purchasePrompt() {
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "Enter ID # of the item you would like to purchase: ",
            filter: Number
        },
        {
            name: "Quantity",
            type: "input",
            message: "How many would you like to buy?",
            filter: Number
        }
    ]).then(function(answers){
        var quantityNeeded = answers.Quantity;
        var IDrequested = answers.ID;
        purchaseOrder(IDrequested, quantityNeeded);
    });
}

displayProducts();