require('dotenv').config();
const mysql = require('mysql');
const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
  });


connection.connect();

connection.query('SELECT * FROM `my_device`', function (error, result, fields) {
  if (error)
    throw error;
  else
    console.log(result);
});

app.route("/powersocketDB")
.post(cors(), function(req, res){
  connection.query('SELECT * FROM `my_device`', function (error, result, fields) {
    if (error)
      throw error;
    else
      res.send(result);
  });
})
.patch(function(req, res){
  connection.query("UPDATE `my_device` SET Name=\""
  +req.body.name+ "\" WHERE ID=" +req.body.id , function(error, result, fields) {
    if (error) throw error;
    else console.log("Success update");
  });
});


app.listen(process.env.PORT);
