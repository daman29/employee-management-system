require("dotenv").config();
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2/promise");
const DbQuery = require("./lib/DbQuery");

async function main() {
  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  const queries = new DbQuery(db);
//   queries.selectDB();
  await queries.viewAllDepartments(db);
}

main();
