const db = require("../config/db");

class Employee {
  constructor(firstName, lastName, roleId, managerId) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.roleId = roleId;
    this.managerId = managerId;
  }

  add() {
    let sql = `
          INSERT INTO employee(first_name, last_name, role_id, manager_id)
          VALUES ('${this.firstName}', '${this.lastName}', '${this.roleId}','${this.managerId}');
          `;

    const employee = db.execute(sql);

    return employee;
  }

  addNoManager() {
    let sql = `
          INSERT INTO employee(first_name, last_name, role_id)
          VALUES ('${this.firstName}', '${this.lastName}', '${this.roleId}');
          `;

    const employee = db.execute(sql);

    return employee;
  }

  static updateRole(id, roleId) {
    let sql = `UPDATE employee SET role_id = ${roleId} WHERE id = ${id};`;
    const response = db.execute(sql);
    return response;
  }

  static updateManager(eId, mId) {
    let sql = `UPDATE employee SET manager_id = ${mId} WHERE id = ${eId};`;
    const response = db.execute(sql);
    return response;
  }

  static getFromManagerId(id) {
    let sql;
    if (id === "null") {
      sql = `SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS job_title, department.name as department_name, role.salary, CONCAT(m.first_name, ' ' , m.last_name) AS manager_name
    FROM employee
    JOIN role on employee.role_id = role.id
    JOIN department on role.department_id = department.id
    LEFT JOIN employee m on m.id = employee.manager_id
    WHERE employee.manager_id IS NULL;`;
    } else {
      sql = `SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS job_title, department.name as department_name, role.salary, CONCAT(m.first_name, ' ' , m.last_name) AS manager_name
    FROM employee
    JOIN role on employee.role_id = role.id
    JOIN department on role.department_id = department.id
    LEFT JOIN employee m on m.id = employee.manager_id
    WHERE employee.manager_id = ${id};`;
    }

    const response = db.execute(sql);
    return response;
  }

  static getFromDepartment(name) {
    let sql = `SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS job_title, department.name as department_name, role.salary, CONCAT(m.first_name, ' ' , m.last_name) AS manager_name
    FROM employee
    JOIN role on employee.role_id = role.id
    JOIN department on role.department_id = department.id
    LEFT JOIN employee m on m.id = employee.manager_id
    WHERE department.name = "${name}";`;

    const response = db.execute(sql);
    return response;
  }

  static getEmployeeId(firstName, lastName) {
    let sql = `SELECT id FROM employee WHERE first_name = '${firstName}' AND last_name = '${lastName}';`;

    const response = db.execute(sql);

    return response;
  }

  static getAll() {
    let sql = `SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS job_title, department.name as department_name, role.salary, CONCAT(m.first_name, ' ' , m.last_name) AS manager_name
    FROM employee
    LEFT JOIN role on employee.role_id = role.id
    LEFT JOIN department on role.department_id = department.id
    LEFT JOIN employee m on m.id = employee.manager_id;`;

    const response = db.execute(sql);

    return response;
  }

  static getAllEmployeesRaw() {
    let sql = "SELECT * FROM employee;";
    const response = db.execute(sql);
    return response;
  }

  static delete(id){
    let sql = `DELETE FROM employee WHERE id = ${id}`
    const response = db.execute(sql);
    return response;
  }
}

module.exports = Employee;
