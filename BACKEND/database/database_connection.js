mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root" ,
    database : "resolveit",
    multipleStatements: true,
})
// console.log("bjusc");

connection.connect((err,result)=>{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("sql connected");
    }
})
module.exports = connection;