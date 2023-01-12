const mysql = require("mysql")
require("dotenv").config()

const db= mysql.createConnection({
    host:process.env.host,
    user:process.env.user,
    port:process.env.port,
    password:process.env.password,
    database:process.env.database
})
db.connect((err) => {
    if (err) return console.log(err.message);
    console.log("connected")
  })
module.exports = db