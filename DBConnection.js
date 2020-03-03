var mysql = require('mysql');

var connection = mysql.createConnection({
    supportBigNumbers: true,
    bigNumberStrings: true,
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "csc317db"
  });
  
  connection.connect((err) => {
      if(err){
          console.log(err);
      }else{
          console.log("SUCCESS connected to db");
      } 
  });

module.exports = connection;