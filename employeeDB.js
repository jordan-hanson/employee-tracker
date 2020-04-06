const msql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 2200,
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "employeeDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
    connection.end();
})