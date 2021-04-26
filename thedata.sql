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
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Sales");

-- INSERT INTO roles
INSERT INTO roles (title, salary, department_id) VALUES ("Software Engineer", 150000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ("UX-UI Engineer", 140000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ("Cloud Engineer", 155000, 1);

INSERT INTO roles (title, salary, department_id) VALUES ("Sales Lead", 100000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ("Salesperson", 80000, 2);

-- INSERT INTO employee
INSERT INTO employee (first_name, last_name, manager_id, roles_id) VALUES ("Mister", "Bossman", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, roles_id) VALUES ("Sabrina", "Luka", 1, 1);
INSERT INTO employee (first_name, last_name, manager_id, roles_id) VALUES ("Sem", "Bonifatius", 2, 1);
INSERT INTO employee (first_name, last_name, manager_id, roles_id) VALUES ("Jerold", "Valentin", 2, 1);
INSERT INTO employee (first_name, last_name, manager_id, roles_id) VALUES ("Adone", "Young-Ho", 2, 2);
INSERT INTO employee (first_name, last_name, manager_id, roles_id) VALUES ("Aydan", "Alfiya", 2, 3);
INSERT INTO employee (first_name, last_name, manager_id, roles_id) VALUES ("Eustathios", "Muiris", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, roles_id) VALUES ("Damayanti", "Elfeda", 8, 5);
INSERT INTO employee (first_name, last_name, manager_id, roles_id) VALUES ("Ruyus", "Juvenal", 8, 5);