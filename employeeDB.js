const mysql = require("mysql");
const inquirer = require("inquirer")

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
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
                "View All Employees By Manager",
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

function viewDepartmentTeam() {
    inquirer
        .prompt({
            name: "department",
            type: "list",
            message: "What department do you want to view?",
            choices: [
                "Sales",
                "Engineering",
                "Finance",
                "Legal"
            ]
        })
        .then(function (answer) {
            const query = "SELECT * FROM employee_tracker WHERE department = ?";
            connection.query(query, [answer.department], function (err, res) {
                console.table(res)
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    console.log("--------------------------------")
                    console.log("Department:" + res[i].department);
                    console.log("this is the query", query)
                }
                runTracker();
            });
        });
};

function viewManagerTeam() {
    inquirer
        .prompt({
            name: "manager",
            type: "list",
            message: "Which Managers Team do you want to view?",
            choices: [
                "Tayler Ktestakis",
                "Todd Hanson",
                "Ryan Johnson",
                "Austin Reems"
            ]
        })
        .then(function (answer) {
            const query = "SELECT * FROM employee_tracker WHERE manager = ?";
            connection.query(query, [answer.manager], function (err, res) {
                console.table(res)
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    console.log("--------------------------------")
                    console.log("Manager:" + res[i].manager);
                    console.log("this is the query", query)
                }
                runTracker();
            });
        });
}
function addEmployee() {
    inquirer
        .prompt([{
            name: "first_name",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "role",
            type: "list",
            message: "What is the employee's role?",
            choices: [
                "Sales Lead",
                "Salesperson",
                "Lead Engineer",
                "Software Engineer",
                "Account Manager",
                "Accountant",
                "Legal Team Lead"
            ]
        },
        {
            name: "manager",
            type: "list",
            message: "Who is the employee's manager?",
            choices: [
                "Tayler Ktestakis",
                "Todd Hanson",
                "Ryan Johnson",
                "Austin Reems"
            ]
        }
        ])
        .then(function (answer) {
            console.log("adding employee", answer.manager, answer.role, answer.last_name, answer.first_name)
            runTracker();
        })

}