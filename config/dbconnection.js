const mysql = require("mysql")
require("dotenv").config()

const db= mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    port:process.env.PORT,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})
db.connect((err) => {
    if (err) return console.log(err.message);
    console.log("connected")
  })
module.exports = db