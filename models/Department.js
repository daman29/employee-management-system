const db = require("../config/db");

class Department {
  constructor(departmentName) {
    this.name = departmentName;
  }

  add() {
    let sql = `
        INSERT INTO department(name)
        VALUES ('${this.name}');
        `;

    const department = db.execute(sql);

    return department;
  }

  static getDepId(name) {
    let sql = `SELECT id FROM department WHERE name = '${name}';`;

    const response = db.execute(sql);

    return response;
  }

  static getDepName(id) {
    let sql = `SELECT name FROM department WHERE id = '${id}';`;

    const response = db.execute(sql);

    return response;
  }

  static getAll() {
    let sql =
      "SELECT id AS department_id, name AS department_name FROM department;";
    const response = db.execute(sql);

    return response;
  }

  static getAllDepartmentsRaw() {
    let sql = "SELECT * FROM department;";
    const response = db.execute(sql);
    return response;
  }
}

module.exports = Department;
