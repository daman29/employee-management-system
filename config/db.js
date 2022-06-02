require("dotenv").config();
// load mysql2 module
const mysql = require("mysql2");

// create database connection 
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

// return the connection promise
module.exports = pool.promise();
