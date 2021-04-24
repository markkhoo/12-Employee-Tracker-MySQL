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

-- **************************** CREATE SEEDS ****************************

-- INSERT INTO department


-- INSERT INTO roles


-- INSERT INTO employee