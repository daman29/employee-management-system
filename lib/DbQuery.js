const cTables = require('console.table')
const Department = require("../models/Department");
const Employee = require("../models/Employee");
const Role = require("../models/Role");

exports.viewAllDepartments = async () => {
  const [departments,_] = await Department.getAll();
  console.table(departments)
};

exports.viewAllEmployees = async () => {
  const [employees,_] = await Employee.getAll();
  console.table(employees)
};

exports.viewAllRoles = async () => {
  const [roles,_] = await Role.getAll();
  console.table(roles)
};

exports.addDepartment = async (departmentName) => {
  let department = new Department(departmentName)

  department = await department.add();

  console.table(department[0])
}
