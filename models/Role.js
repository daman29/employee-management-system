const db = require("../config/db");

// Role class model
class Role {
  constructor(title, salary, departmentId) {
    this.title = title;
    this.salary = salary;
    this.departmentId = departmentId;
  }

  // add method to add a new role to the database
  add() {
    // sql query
    let sql = `
          INSERT INTO role(title, salary, department_id)
          VALUES ('${this.title}', '${this.salary}', '${this.departmentId}');
          `;

    // execute sql query
    const role = db.execute(sql);

    // return response
    return role;
  }

  // get role ID by role name
  static getRoleId(name) {
    let sql = `SELECT id FROM role WHERE title = "${name}";`;
    const roleId = db.execute(sql);
    return roleId;
  }

  // get a formatted role table
  static getAll() {
    let sql = `SELECT  role.id AS role_id, role.title AS job_title, department.name as department_name, role.salary 
    FROM role
    LEFT JOIN department on role.department_id = department.id;`;
    const response = db.execute(sql);

    return response;
  }

  // get the raw role table
  static getAllRolesRaw() {
    let sql = "SELECT * FROM role;";
    const response = db.execute(sql);
    return response;
  }

  // delete a role by specified id
  static delete(id) {
    let sql = `DELETE FROM role WHERE id = ${id}`;
    const response = db.execute(sql);
    return response;
  }
}

module.exports = Role;
