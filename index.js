const mysql = require('mysql');
var inquirer = require('inquirer')

// Create Connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'companyTracker',
});

// Init connection
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);

    // Run initial prompt

});