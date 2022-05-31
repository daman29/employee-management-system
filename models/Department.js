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

    const [department, _] = db.execute(sql);

    return console.table(department);
  }

  static getAll() {}
}
