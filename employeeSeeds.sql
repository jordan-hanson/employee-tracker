DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    title VARCHAR(50) NOT NULL,
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role(
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL (10, 4) NULL,
    department_id INT NOT NULL
);

INSERT INTO employee_tracker (first_name, last_name, title, department, salary, manager)
VALUES ("Jordan", "Hanson", "Full Stack Developer", "Engineering", 75000, "Tayler Ktestakis");

