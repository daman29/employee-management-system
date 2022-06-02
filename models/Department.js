const db = require("../config/db");

// Department class model
class Department {
  constructor(departmentName) {
    this.name = departmentName;
  }

  // add method to add a new department to the database
  add() {
    // sql query
    let sql = `
        INSERT INTO department(name)
        VALUES ('${this.name}');
        `;

    // execute sql query
    const department = db.execute(sql);
    // return response
    return department;
  }

  // get department ID by department name
  static getDepId(name) {
    let sql = `SELECT id FROM department WHERE name = '${name}';`;
    const response = db.execute(sql);
    return response;
  }

  // get department name by department ID
  static getDepName(id) {
    let sql = `SELECT name FROM department WHERE id = '${id}';`;
    const response = db.execute(sql);
    return response;
  }

  // get a formatted department table
  static getAll() {
    let sql =
      "SELECT id AS department_id, name AS department_name FROM department;";
    const response = db.execute(sql);

    return response;
  }

  // get the raw department table
  static getAllDepartmentsRaw() {
    let sql = "SELECT * FROM department;";
    const response = db.execute(sql);
    return response;
  }

  // delete a department by specified id
  static delete(id) {
    let sql = `DELETE FROM department WHERE id = ${id}`;
    const response = db.execute(sql);
    return response;
  }
}

module.exports = Department;
