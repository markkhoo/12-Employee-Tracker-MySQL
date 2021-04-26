# 12-Employee-Tracker-MySQL

## Description
This simple commandline application can be used to keep track of employee, role, and department data. To use, follow the [Installation](##Installation) instructions then see [Usage](##Usage) for a walkthrough on how to use the application. The link to the GitHub repository can be found [here](https://github.com/markkhoo/12-Employee-Tracker-MySQL).

## Installation
As this is a commandline allplication, steps for installion on your local machine is required. Complete the following steps:
1. Clone this repository onto your local machine.
2. Install modules by navagating to the repository in your CLI and running `'npm install'`. This should install all necessary modules for this application.
3. In your MySQL shell, run the schema that is found in `thedata.sql` to instantiate the database locally. A snippet of the schema is provided here as well:
    ```sql
    DROP DATABASE IF EXISTS company_DB;
    CREATE DATABASE company_DB;
    USE company_DB;

    -- *************************** CREATE QUERIES ***************************

    -- CREATE TABLE department
    CREATE TABLE department (
        id INT AUTO_INCREMENT NOT NULL,
        name VARCHAR(30) NOT NULL,
        PRIMARY KEY (id)
    );

    -- CREATE TABLE roles
    CREATE TABLE roles (
        id INT AUTO_INCREMENT NOT NULL,
        title VARCHAR(30) NOT NULL,
        salary DEC DEFAULT 0,
        PRIMARY KEY (id),
        -- FOREIGN KEY CONSTRAINTS
        department_id INT NOT NULL,
        FOREIGN KEY (department_id) REFERENCES department(id)
    );

    -- CREATE TABLE employee
    CREATE TABLE employee (
        id INT AUTO_INCREMENT NOT NULL,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        PRIMARY KEY (id),
        -- FOREIGN KEY CONSTRAINTS
        manager_id INT NOT NULL,
        roles_id INT NOT NULL,
        FOREIGN KEY (manager_id) REFERENCES employee(id),
        FOREIGN KEY (roles_id) REFERENCES roles(id)
    );
    ```
    Example `seeds` are provided within the same file are optional for use.

4. All installation steps should be complete. `'npm start'` can be used to start the application. See [Usage](##Usage) for more details.

## Usage
This [video](https://youtu.be/oFjmaMEO90Q) provides a short and simple walkthrough on how to use this application. Simply run `'npm start'` in your CLI to use the application.

## Technologies Used
* Javascript
* SQL
* MySQL
* npm inquirer

---

## Contact
For any questions contact GitHub user [markkhoo](https://github.com/markkhoo) or at this email: markkhoo95@gmail.com