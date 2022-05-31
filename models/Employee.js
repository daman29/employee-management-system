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
  
      return console.table(employee);
    }
  
    static getAll() {
        let sql = "SELECT * FROM employee"
        const response = db.execute(sql);
  
        return response;
    }
  }
  
  module.exports = Employee;