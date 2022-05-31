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

  static getAll() {
      let sql = "SELECT * FROM department"
      const response = db.execute(sql);

      return response;
  }
}

module.exports = Department;