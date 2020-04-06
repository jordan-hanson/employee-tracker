DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee_tracker (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    title VARCHAR(50) NOT NULL,
    department VARCHAR(30) NOT NULL,
    salary INT default 0,
    manager VARCHAR(50) NULL,
    PRIMARY KEY(id)
);