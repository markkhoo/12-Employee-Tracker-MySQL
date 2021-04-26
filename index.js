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
                //
                break;
            case 'Update Employee Role':
                //
                break;
            case 'Update Employee Manager':
                //
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
                //
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
}

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
            ON t2.roles_id = tR.id 
                INNER JOIN department tD
                ON tR.department_id = tD.id
        ORDER BY employee ASC
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


// Function Update Employee Role


// Function Update Employee Manager


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
        console.log('Inserting a new Employee...\n');
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


// Function Remove Department


// Function Update Department Name
