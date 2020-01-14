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

connection.connect(function (err) {
    if (err) throw err;
});

// cli-table function to display products in an organized format
function displayProducts() {
    // variable for later refrencing the selection from our MySQL "products" table
    var query = "SELECT * FROM products";

    connection.query(query, function (err, resp) {
        if (err) throw err;

        console.log("");
        console.log("· • ⸰ ° 𝕎 𝔼 𝕃 ℂ 𝕆 𝕄 𝔼 ° ⸰ • · \n" + 
                    "     · • ⸰ ° 𝕋 𝕆 ° ⸰ • ·\n" +
                    "· • ⸰ ° 𝔹 𝔸 𝕄 𝔸 ℤ 𝕆 ℕ ° ⸰ • ·");

        var displayTable = new table({
            head: ["Item ID", "Product", "Category", "Price", "Quantity"],
            colWidths: [10, 22, 22, 10, 10]
        });
        for (var i = 0; i < resp.length; i++) {
            displayTable.push([resp[i].item_id, resp[i].product_name, resp[i].department_name, resp[i].price, resp[i].stock_quantity]);
        }
        console.log(displayTable.toString());
        console.log("");
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
    ]).then(function(answers) {
        var quantity = answers.Quantity;
        var IDrequested = answers.ID;
        purchaseOrder(IDrequested, quantity);
    });
}

function purchaseOrder(ID, quantityWanted) {
    connection.query("SELECT * FROM products WHERE item_id = " + ID, function(err,resp) {
        if(err) throw err;
        if(quantityWanted <= resp[0].stock_quantity) {
            var totalCost = resp[0].price * quantityWanted;
            console.log("")
            console.log("Good news! We have enough in stock to complete your order!");
            console.log("Your order total for " + quantityWanted + " " + resp[0].product_name + " is $" + totalCost);
            console.log("Thank you for shopping at Bamazon!");
            console.log("");

            var updateQuantity = resp[0].stock_quantity - quantityWanted;
            connection.query("UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: updateQuantity
                },
                {
                    item_id: quantityWanted
                }
            ]);
        } else {
            console.log("");
            console.log("I'm sorry, we don't have enough " + resp[0].product_name + " to complete your order.");
            console.log("");
        };
        reprompt();
    });
}

function reprompt(){
    inquirer.prompt([{
      type: "confirm",
      name: "reply",
      message: "Would you like to purchase a different item?"
    }]).then(function(answer){
      if(answer.reply){
        purchasePrompt();
      } else{
        console.log("Please come again!");
        connection.end();
      }
    });
  }

displayProducts();