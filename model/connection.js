const mysql = require("mysql")

//database connection
const db = mysql.createConnection({
    host:"localhost",
    user:'root',
    password:"",
    database:'ems'
})

db.connect((err)=>{
    if(err) console.log(err)
    console.log("data connection established")
})
module.exports = db