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
    console.log(`connected as id ${connection.threadId}\n`);

    // Run initial prompt
    initPrompt();
});

// Function give users the options to search
function initPrompt() {
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
                //
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
    const query01 = 'SELECT * FROM employee';
    connection.query(query01, (err, res) => {
        if(err) throw err;
        displayInfo(res);
    });
    initPrompt();
};

// 