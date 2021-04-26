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
                ViewAllEmployees();
                break;
            case 'View Employees by Department':
                //
                break;
            case 'View Employees by Manager':
                //
                break;
            case 'Add Employee':
                //
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
                ViewAllRoles();
                break;
            case 'Add Role':
                //
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
                ViewAllDepartment();
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
function ViewAllEmployees () {
    const query01 = `
        SELECT 
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


// Function Remove Employee


// Function Update Employee Name


// Function Update Employee Role


// Function Update Employee Manager


// Function View All Roles
function ViewAllRoles (){
    const query09 = `
        SELECT 
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


// Function Remove Role


// Function Update Role Title


// Function Update Role Salary


// Function Update Role Department


// Function View All Departments
function ViewAllDepartment () {
    const query15 = `
        SELECT
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
