var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  selection();
});




function selection(){
  connection.query("SELECT * FROM products", function(err,res){
    console.log("\n");
    for (var i = 0; i < res.length;i++){
      console.log(res[i].item_id + "::" + res[i].product_name + "::"
    + res[i].department_name + "::" + res[i].price + "::" + res[i].stock_quantity);
    }

    customerPrompt(res)
  });
}

function customerPrompt(res){
  inquirer.prompt([{
    type:"input",
    name:"buy",
    message:"Input the id of the item you wish to buy."
  }]).then(function(answer){
      var idMatch = false;
   
      for (var i = 0; i< res.length;i++)
      {
        if(res[i].item_id == answer.buy)
        {
          idMatch = true;
          var selectedItem = answer.buy;
          var id = i;
          inquirer.prompt({
            type:"input",
            name:"amount",
            message:"How many of " + res[i].product_name+" would you like to buy?",
            validate: function(value){
              if(isNaN(value) == false)
              {
                return true;
              }
              else{
                return false;
              }
            }
          }).then(function(answer){
            if((res[id].stock_quantity-answer.amount) > 0)
            {
              connection.query("UPDATE products SET stock_quantity='"+
              (res[id].stock_quantity-answer.amount) + "' WHERE item_id='"+
              selectedItem +"'");
              selection();
            }else{
              console.log("That amount is not in stock");
              customerPrompt(res);
            }
            
            });
        }
      }
      });
    }

 // connection.end();

