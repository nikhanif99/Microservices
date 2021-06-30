const express = require('express');
const app = express();
 
const cors = require('cors');
app.use(cors());
 
const mysql = require('mysql');
 
var con = mysql.createPool({
  host: "us-cdbr-east-04.cleardb.com",
  user: "bd654de4d40d99",
  password: "9a7d78f4",
  database: "heroku_950ce46ea6e24b7"
});
 
app.get('/', (req, res) => {
  con.getConnection(function (err, tempconnection) {
    if (err) { res.send("Error occured!"); }
    else {
      var sql = "SELECT * FROM staff";
      con.query(sql, function (err, result, fields) {
        if (err) { throw err; }
        else {
          res.send(result);
        }
      tempconnection.release();
      });
    }
  });
});
 
app.listen(process.env.PORT || port, () => {
  console.log('Example app listening to Heroku port.');
});