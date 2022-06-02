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

    return role;
  }

  static getRoleId(name) {
    let sql = `SELECT id FROM role WHERE title = "${name}";`;
    const roleId = db.execute(sql);
    return roleId;
  }

  static getAll() {
    let sql = `SELECT  role.id AS role_id, role.title AS job_title, department.name as department_name, role.salary 
    FROM role
    JOIN department on role.department_id = department.id;`;
    const response = db.execute(sql);

    return response;
  }

  static getAllRolesRaw() {
    let sql = "SELECT * FROM role;";
    const response = db.execute(sql);
    return response;
  }
}

module.exports = Role;
