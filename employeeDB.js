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
                "Add Role to Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "Exit Program"
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

                case "Add Role to Employee":
                    addRole();
                    break;

                case "Update Employee Role":
                    updateRole();
                    break;

                case "Update Employee Manager":
                    updateManager();
                    break;

                case "Exit Program":
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
                "Austin Reems",
                "Georgia Lund",
                "Jody Lloyd",
                "None"
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
                viewAllEmployees();
                console.log("-------------------------------")
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
                viewAllEmployees();
                runTracker();
            });
        });
}

function viewAllEmployees() {
    const sql = "SELECT * FROM employee"
    connection.query(sql, function (err, res) {
        console.log("-----------------------------------")
        console.table(res)
        console.log("-----------------------------------")
        if (err) throw err;
        // runTracker();
    });
}

function addRole() {
    viewAllEmployees()
    const sql = "SELECT employee.first_name AS firstname, employee.last_name AS lastname, employee.title AS title, employee.department AS department, employee.manager AS manager, role_table.role_id AS role, role_table.salary AS salary FROM employee LEFT JOIN role_table ON employee.department = role_table.department"
    connection.query(sql, function (err, res) {
        // let joined = res;
        console.log("------------------------------")
        console.table(res)
        console.log("------------------------------")
        if (err) throw err;
        runTracker();
    });
}

function viewAllEmpWithRole() {
    const sql = "SELECT * FROM employee_role"
    connection.query(sql, function (err, res) {
        console.log("-----------------------------------")
        console.table(res)
        console.log("-----------------------------------")
        if (err) throw err;
        // runTracker();
    });
}

function updateRole() {
    viewAllEmpWithRole()
    inquirer
        .prompt([{
            name: "id",
            type: "number",
            message: "What is the id number of the employee you want to update a role to?"
        },
        {
            name: "role_id",
            type: "list",
            message: "What role would you like to assign to your employee?",
            choices: [
                "Assistant Manager",
                "UX Designer",
                "Accounting Data Analyst",
                "Front End Master",
                "Back End Node Specialist",
                "Lead Salesman",
                "Sales Manager Assistant",
                "Paralegal",
                "Lawyer"
            ]
        }
        ])
        .then(function (answer) {
            const query = "UPDATE employee_role SET role_id = ? WHERE id = ?"
            connection.query(query, [[answer.role_id], (answer.index)], function (err, res) {
                if (err) throw err;
                console.table(res)
                console.log("Employee record updated: " + res.affectedRows);
                viewAllEmployees();
                runTracker();
            });
        });
}

function updateManager() {
    viewAllEmployees()
    inquirer
        .prompt([{
            name: "id",
            type: "number",
            message: "What is the id number of the employee you want to update their manager to?"
        },
        {
            name: "manager",
            type: "list",
            message: "What role would you like to assign to your employee?",
            choices: [
                "Tayler Ktestakis",
                "Todd Hanson",
                "Ryan Johnson",
                "Austin Reems"
            ]
        }
        ])
        .then(function (answer) {
            const query = "UPDATE employee SET manager = ? WHERE id = ?"
            connection.query(query, [[answer.manager], (answer.id)], function (err, res) {
                if (err) throw err;
                console.table(res)
                console.log("Employee record updated: " + res.affectedRows);
                viewAllEmployees();
                runTracker();
            });
        });
}

