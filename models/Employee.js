const db = require("../config/db");

// Employee model class
class Employee {
  constructor(firstName, lastName, roleId, managerId) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.roleId = roleId;
    this.managerId = managerId;
  }

  // add method to add a new employee to the database
  add() {
    // sql query
    let sql = `
          INSERT INTO employee(first_name, last_name, role_id, manager_id)
          VALUES ('${this.firstName}', '${this.lastName}', '${this.roleId}','${this.managerId}');
          `;

    // execute sql query
    const employee = db.execute(sql);

    // return response
    return employee;
  }

  // add method but without the manager_id field to add a new employee to the database
  addNoManager() {
    let sql = `
          INSERT INTO employee(first_name, last_name, role_id)
          VALUES ('${this.firstName}', '${this.lastName}', '${this.roleId}');
          `;

    const employee = db.execute(sql);

    return employee;
  }

  // update role_id for a specified employee.id
  static updateRole(id, roleId) {
    let sql = `UPDATE employee SET role_id = ${roleId} WHERE id = ${id};`;
    const response = db.execute(sql);
    return response;
  }

  // update manager_id for a specified employee.id
  static updateManager(eId, mId) {
    let sql = `UPDATE employee SET manager_id = ${mId} WHERE id = ${eId};`;
    const response = db.execute(sql);
    return response;
  }

  // get all employees with same manager_id
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

  // get all employees with same department.name
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

  // get employee.id by first and last name
  static getEmployeeId(firstName, lastName) {
    let sql = `SELECT id FROM employee WHERE first_name = '${firstName}' AND last_name = '${lastName}';`;

    const response = db.execute(sql);

    return response;
  }

  // get the formatted employee table
  static getAll() {
    let sql = `SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS job_title, department.name as department_name, role.salary, CONCAT(m.first_name, ' ' , m.last_name) AS manager_name
    FROM employee
    LEFT JOIN role on employee.role_id = role.id
    LEFT JOIN department on role.department_id = department.id
    LEFT JOIN employee m on m.id = employee.manager_id;`;

    const response = db.execute(sql);

    return response;
  }

  // get the raw employee table
  static getAllEmployeesRaw() {
    let sql = "SELECT * FROM employee;";
    const response = db.execute(sql);
    return response;
  }

  // delete employee by specified id
  static delete(id) {
    let sql = `DELETE FROM employee WHERE id = ${id}`;
    const response = db.execute(sql);
    return response;
  }
}

module.exports = Employee;
