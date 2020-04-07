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
            type: "rawlist",
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
            const query = "SELECT * FROM employee WHERE department = ?";
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
            const query = "SELECT * FROM employee WHERE manager = ?";
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
};
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
            name: "title",
            type: "list",
            message: "What is the employee's title?",
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
            name: "department",
            type: "list",
            message: "What department is the employee in?",
            choices: [
                "Engineering",
                "Legal",
                "Sales",
                "Finance"
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
            // console.table("this is what answers i got back", answer.first_name, answer.last_name, answer.role, answer.salary, answer.department, answer.manager)
            let query = "INSERT INTO employee (first_name, last_name, title, department, manager) VALUES (?, ?, ?, ?, ?)";
            connection.query(query, [(answer.first_name), (answer.last_name), [answer.title], [answer.department], [answer.manager]], function (err, res) {
                if (err) throw err;
                console.table(res)
                console.log("-------------------------------")
                console.log("Employee record added: ", res.affectedRows)
                runTracker();
            });
        });

}

function removeEmployee() {
    const query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        console.log("---------------------------------------------")
        console.table(res)
        console.log("---------------------------------------------")
        if (err) throw err;
        for (var i = 0; i < res.length; i++);
    })
    inquirer
        .prompt({
            name: "id",
            type: "number",
            message: "What is the id of the employee you want to delete?"
        })
        .then(function (answer) {
            const sql = "DELETE FROM employee WHERE id = ?"
            connection.query(sql, (answer.id), function (err, res) {
                if (err) throw err;
                console.table(res)
                console.log("Employee record deleted: " + res.affectedRows);
                runTracker();
            });
        });
}
// function addEmployee() {
//     inquirer
//         .prompt([{
//             name: "first_name",
//             type: "input",
//             message: "What is the employee's first name?"
//         },
//         {
//             name: "last_name",
//             type: "input",
//             message: "What is the employee's last name?"
//         },
//         {
//             name: "title",
//             type: "list",
//             message: "What is the employee's title?",
//             choices: [
//                 "Sales Lead",
//                 "Salesperson",
//                 "Lead Engineer",
//                 "Software Engineer",
//                 "Account Manager",
//                 "Accountant",
//                 "Legal Team Lead"
//             ]
//         },
//         {
//             name: "deparment",
//             type: "list",
//             message: "What department is the employee in?",
//             choices: [
//                 "Engineering",
//                 "Legal",
//                 "Sales",
//                 "Finance"

//             ]
//         },
//         {
//             name: "salary",
//             type: "input",
//             message: "What is the salary of the employee?"
//         },
//         {
//             name: "manager",
//             type: "list",
//             message: "Who is the employee's manager?",
//             choices: [
//                 "Tayler Ktestakis",
//                 "Todd Hanson",
//                 "Ryan Johnson",
//                 "Austin Reems"
//             ]
//         }
//         ])
//         .then(function (answer) {
//             // console.table("this is what answers i got back", answer.first_name, answer.last_name, answer.role, answer.salary, answer.department, answer.manager)
//             let query = "INSERT INTO employee SET ?";
//             connection.query(query, (answer.first_name), (answer.last_name), [answer.title], [answer.department], (answer.salary), [answer.manager], function (err, res) {
//                 console.table(res)
//                 if (err) throw err;
//                 for (var i = 0; i < res.length; i++) {
//                     console.log("----------------")
//                     console.log("this is query", query)
//                 }
//                 runTracker();
//             })
//         });

// }
