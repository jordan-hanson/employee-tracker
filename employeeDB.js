const mysql = require("mysql");
const inquirer = require("inquirer")

const connection = mysql.createConnection({
    host: "localhost",
    port: 2200,
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
    runTracker();
})

function runTracker() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees By Department",
                "View All Employees by Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "View All Roles"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees By Department":
                    viewDepartmentTeam();
                    break;

                case "View All Employees By Manager":
                    viewManagerTeam();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Remove Employee":
                    removeEmployee();
                    break;

                case "Update Employee Role":
                    updateRole();
                    break;

                case "Update Employee Manager":
                    updateManager();
                    break;

                case "View All Roles":
                    viewAllRoles();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        })
}



//  why is my afterConnection not being called.
// function afterConnection() {
//     connection.query("SELECT * FROM employees", function (err, res) {
//         if (err) throw err;
//         console.log("my response from database", res)
//         connection.end();
//     })
// }