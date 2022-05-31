const cTable = require("console.table");

class DbQuery {
  constructor(db) {
    this.db = db;
    this.dbName = "employees_db";
  }

  selectDB(db) {
    const sql = `USE ${this.dbName}`;
    db.query(sql, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log(`${this.dbName} is selected`);
    });
  }

  viewAllDepartments(db) {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, result) => {
      if (err) {
        return console.error(err);
      }
      console.table(result);
    });
  }

  viewAllRoles() {}
  viewAllEmployees() {}
}

module.exports = DbQuery;
