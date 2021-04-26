const mysql = require('mysql');
var inquirer = require('inquirer')

// Create Connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'company_DB',
});

// Init connection
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    // Run initial prompt
    initPrompt();
});

// Function give users the options to search
function initPrompt() {
    console.log('\n');
    inquirer.prompt({
        name: 'choices',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View All Employees', 
            'View Employees by Department', 
            'View Employees by Manager', 
            'Add Employee',
            'Remove Employee',
            'Update Employee Name',
            'Update Employee Role',
            'Update Employee Manager',
            'View All Roles',
            'Add Role',
            'Remove Role',
            'Update Role Title',
            'Update Role Salary',
            'Update Role Department',
            'View All Departments',
            'Add Deparment',
            'Remove Department',
            'Update Department Name',
            'Exit'
        ],
    })
    .then((answer) => {
        switch(answer.choices) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'View Employees by Department':
                //
                break;
            case 'View Employees by Manager':
                //
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Remove Employee':
                //
                break;
            case 'Update Employee Name':
                updateEmployeeName();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'Update Employee Manager':
                updateEmployeeManager();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Remove Role':
                //
                break;
            case 'Update Role Title':
                //
                break;
            case 'Update Role Salary':
                //
                break;
            case 'Update Role Department':
                //
                break;
            case 'View All Departments':
                viewAllDepartment();
                break;
            case 'Add Deparment':
                addDepartment();
                break;
            case 'Remove Department':
                //
                break;
            case 'Update Department Name':
                //
                break;
            case 'Exit':
                connection.end();
                break;
        };
    });
};

// Function Display Table
function displayInfo (tableToDisplay) {
    console.log('\n');
    console.table(tableToDisplay);
    console.log('(Move up and down to select your next option)\n\n\n\n\n\n\n\n');
};

// Function View All Employees
function viewAllEmployees () {
    const query01 = `
        SELECT 
            t1.id ID,
            CONCAT(t1.first_name, ' ', t1.last_name) Employee,
            tR.title Role,
            tD.name Department,
            CONCAT(t2.first_name, ' ', t2.last_name) Manager
        FROM employee t1 
        INNER JOIN employee t2 
        ON t1.manager_id = t2.id 
            INNER JOIN roles tR 
            ON t1.roles_id = tR.id 
                INNER JOIN department tD
                ON tR.department_id = tD.id
        ORDER BY t1.last_name ASC
    ;`;
    connection.query(query01, (err, res) => {
        if(err) throw err;
        displayInfo(res);
    });
    initPrompt();
};

// Function View Employees by Department


// Function View Employees by Manager


// Function Add Employee
function addEmployee () {
    inquirer.prompt([
        {
            name: 'first',
            type: 'input',
            message: 'What is the first name of the Employee?'
        },
        {
            name: 'last',
            type: 'input',
            message: 'What is the last name of the Employee?'
        },
        {
            name: 'managerID',
            type: 'number',
            message: 'What is the ID of the Employees Manager?'
        },
        {
            name: 'roleID',
            type: 'number',
            message: 'What is the ID of the Employees Role?'
        },
    ]).then((answer) => {
        console.log('Inserting a new Employee...\n');
        connection.query('INSERT INTO employee SET ?',{
            first_name: answer.first,
            last_name: answer.last,
            manager_id: answer.managerID,
            roles_id: answer.roleID,
        }, (err, res) => {
            if(err) throw err;
            viewAllEmployees();
        });
    });
};

// Function Remove Employee


// Function Update Employee Name
function updateEmployeeName () {
    let objOfNames;
    let listOfNames = [];
    let employeeID = 0;
    connection.query(`
        SELECT
            t1.id id,
            CONCAT(t1.first_name, ' ', t1.last_name) employee
        FROM
            employee t1
        ORDER BY last_name ASC
    ;`, (err, res) => {
        if(err) throw err;
        objOfNames = res;
        for (let i = 0; i < res.length; i++) {
            listOfNames.push(res[i].employee);
        };
        inquirer.prompt({
            name: 'full_name',
            type: 'list',
            message: 'Which Employee would you like to update the name of?',
            choices: listOfNames
        }).then((answer) => {
            employeeID = objOfNames[listOfNames.indexOf(answer.full_name)].id;
            inquirer.prompt([
                {
                    name: 'first',
                    type: 'input',
                    message: 'What is the first name of the Employee?'
                },
                {
                    name: 'last',
                    type: 'input',
                    message: 'What is the last name of the Employee?'
                },
            ]).then((answer) => {
                console.log('Updating Employee Name...\n');
                connection.query(`
                    UPDATE employee SET first_name = '${answer.first}', last_name = '${answer.last}' WHERE id = ${employeeID}
                ;`, (err, res) => {
                    if(err) throw err;
                    viewAllEmployees();
                });
            });
        });
    });
};

// Function Update Employee Role
function updateEmployeeRole () {
    let objOfNames;
    let listOfNames = [];
    let employeeID = 0;
    let objOfRoles;
    let listOfRoles = [];
    let roleID = 0;
    connection.query(`
        SELECT
            t1.id id,
            CONCAT(t1.first_name, ' ', t1.last_name) employee,
            tR.title role
        FROM employee t1
        INNER JOIN roles tR
        ON t1.roles_id = tR.id 
        ORDER BY id ASC
    ;`, (err, res) => {
        if(err) throw err;
        objOfNames = res;
        for (let i = 0; i < res.length; i++) {
            listOfNames.push(`${res[i].employee}: ${res[i].role}`);
        };
        inquirer.prompt({
            name: 'employee',
            type: 'list',
            message: 'Which Employee would you like to update the role of?',
            choices: listOfNames
        }).then((answer) => {
            employeeID = objOfNames[listOfNames.indexOf(answer.employee)].id;
            connection.query(`
                SELECT
                    tR.id id,
                    tR.title role
                FROM roles tR
                ORDER BY title ASC
            ;`, (err, res) => {
                if(err) throw err;
                objOfRoles = res;
                for (let i = 0; i < res.length; i++) {
                    listOfRoles.push(res[i].role);
                };
                inquirer.prompt({
                    name: 'role',
                    type: 'list',
                    message: 'What role would you like to use?',
                    choices: listOfRoles
                }).then((answer) => {
                    roleID = objOfRoles[listOfRoles.indexOf(answer.role)].id;
                    connection.query(`
                        UPDATE employee SET roles_id = '${roleID}' WHERE id = '${employeeID}'
                    ;`, (err, res) => {
                        if(err) throw err;
                        console.log('Updating Employee Role...\n');
                        viewAllEmployees();
                    });
                });
            });
        });
    });
};

// Function Update Employee Manager
function updateEmployeeManager () {
    let objOfNames;
    let listOfNames = [];
    let employeeID = 0;
    let objOfManagers;
    let listOfManagers = [];
    let managerID = 0;
    connection.query(`
        SELECT
            t1.id id,
            CONCAT(t1.first_name, ' ', t1.last_name) employee,
            CONCAT(t2.first_name, ' ', t2.last_name) manager
        FROM employee t1 
        INNER JOIN employee t2 
        ON t1.manager_id = t2.id 
        ORDER BY t1.id ASC
    ;`, (err, res) => {
        if(err) throw err;
        objOfNames = res;
        for (let i = 0; i < res.length; i++) {
            listOfNames.push(`Employee: ${res[i].employee} - Manager: ${res[i].manager}`);
        };
        inquirer.prompt({
            name: 'employee',
            type: 'list',
            message: 'Which Employee would you like to update the manager of?',
            choices: listOfNames
        }).then((answer) => {
            employeeID = objOfNames[listOfNames.indexOf(answer.employee)].id;
            connection.query(`
                SELECT
                    t1.id id,
                    CONCAT(t1.first_name, ' ', t1.last_name) employee
                FROM employee t1
                ORDER BY t1.last_name ASC
            ;`, (err, res) => {
                if(err) throw err;
                objOfManagers = res;
                for (let i = 0; i < res.length; i++) {
                    listOfManagers.push(res[i].employee);
                };
                inquirer.prompt({
                    name: 'manager',
                    type: 'list',
                    message: 'Who is the manager of this employee?',
                    choices: listOfManagers
                }).then((answer) => {
                    managerID = objOfManagers[listOfManagers.indexOf(answer.manager)].id;
                    connection.query(`
                        UPDATE employee SET manager_id = '${managerID}' WHERE id = '${employeeID}'
                    `, (err, res) => {
                        if(err) throw err;
                        console.log('Updating the Manager of Employee...\n');
                        viewAllEmployees();
                    });
                });
            });
        });
    });
};

// Function View All Roles
function viewAllRoles () {
    const query09 = `
        SELECT 
            tr.id ID,
            tR.title Role,
            tR.salary Salary,
            tD.name Department
        FROM roles tR 
        INNER JOIN department tD
        ON tR.department_id = tD.id
        ORDER BY Role ASC
    ;`;
    connection.query(query09, (err, res) => {
        if(err) throw err;
        displayInfo(res);
    });
    initPrompt();
};

// Function Add Role
function addRole () {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the Role?'
        },
        {
            name: 'salary',
            type: 'number',
            message: 'What is the Salary of this Role?'
        },
        {
            name: 'departmentID',
            type: 'number',
            message: 'What is the department ID of this Role?'
        },
    ]).then((answer) => {
        console.log('Inserting a new Role...\n');
        connection.query('INSERT INTO roles SET ?',{
            title: answer.title,
            salary: answer.salary,
            department_id: answer.departmentID,
        }, (err, res) => {
            if(err) throw err;
            viewAllRoles();
        });
    });
};

// Function Remove Role


// Function Update Role Title


// Function Update Role Salary


// Function Update Role Department


// Function View All Departments
function viewAllDepartment () {
    const query15 = `
        SELECT
            tD.id ID,
            tD.name Department 
        FROM department tD
        ORDER BY name ASC
    ;`;
    connection.query(query15, (err, res) => {
        if(err) throw err;
        displayInfo(res);
    });
    initPrompt();
};

// Function Add Department
function addDepartment () {
    inquirer.prompt({
        name: 'department',
        type: 'input',
        message: 'What is the Department?'
    }).then((answer) => {
        connection.query('INSERT INTO department SET ?', {
            name: answer.department,
        }, (err, res) => {
            if(err) throw err;
            console.log('Inserting a new Department...\n');
            viewAllDepartment();
        });
    });
};

// Function Remove Department


// Function Update Department Name
