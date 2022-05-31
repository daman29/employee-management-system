require("dotenv").config();
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2/promise");
const DbQuery = require("./lib/DbQuery");

// DbQuery.viewAllDepartments();
// DbQuery.viewAllEmployees();
// DbQuery.viewAllRoles();

// DbQuery.addDepartment("Cleaners")
