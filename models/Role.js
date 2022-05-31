const db = require("../config/db");

class Role {
  constructor(title, salary, departmentId) {
    this.title = title;
    this.salary = salary;
    this.departmentId = departmentId;
  }

  add() {
    let sql = `
          INSERT INTO role(title, salary, department_id)
          VALUES ('${this.title}', '${this.salary}', '${this.departmentId}');
          `;

    const role = db.execute(sql);

    return console.table(role);
  }

  static getAll() {
    let sql = "SELECT * FROM role";
    const response = db.execute(sql);

    return response;
  }
}

module.exports = Role;
