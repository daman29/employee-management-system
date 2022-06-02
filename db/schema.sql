-- create a new schema employees_db
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;
-- create new tables(department, role and employee) to match the schema image in readme file
CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);
CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    -- department_id is a foreign key
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE
    SET NULL
);
CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    -- manager_id and role_id are foreign keys
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE
    SET NULL,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE
    SET NULL
);