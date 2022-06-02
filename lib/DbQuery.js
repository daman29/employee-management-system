const cTables = require("console.table");
const Department = require("../models/Department");
const Employee = require("../models/Employee");
const Role = require("../models/Role");

// module to hold all database queries in one file

// view all departments query
exports.viewAllDepartments = async () => {
  const [departments, _] = await Department.getAll();
  return departments;
};

// view all employees query
exports.viewAllEmployees = async () => {
  const [employees, _] = await Employee.getAll();
  return employees;
};

// view all roles query
exports.viewAllRoles = async () => {
  const [roles, _] = await Role.getAll();
  return roles;
};

// get the raw departments table
exports.getDepartments = async () => {
  const [departments, _] = await Department.getAllDepartmentsRaw();
  return departments;
};

// get the raw employees table
exports.getEmployees = async () => {
  const [employees, _] = await Employee.getAllEmployeesRaw();
  return employees;
};

// get the raw roles table
exports.getRoles = async () => {
  const [roles, _] = await Role.getAllRolesRaw();
  return roles;
};

// get department id by department name 
exports.getDepByName = async (name) => {
  const [dep, _] = await Department.getDepId(name);
  return dep[0].id;
};

// query to get department name by id
exports.getDepById = async (id) => {
  const [dep, _] = await Department.getDepName(id);
  return dep[0].name;
};

// query to get employee id by employee first and last name
exports.getEmpByName = async (firstName, lastName) => {
  const [emp, _] = await Employee.getEmployeeId(firstName, lastName);

  return emp[0].id;
};

// query to get employees ids by manager_id
exports.getEmpByManager = async (id) => {
  const [emp, _] = await Employee.getFromManagerId(id);
  return emp;
};

// query to get employees ids by department_id
exports.getEmpByDepartment = async (department) => {
  const [emp, _] = await Employee.getFromDepartment(department);
  return emp;
};

// query to get role id by role title
exports.getRoleByName = async (name) => {
  const [role, _] = await Role.getRoleId(name);
  return role[0].id;
};

// query to add new department
exports.addDepartment = async (departmentName) => {
  let department = new Department(departmentName);
  department = await department.add();
};


//query to add new role
exports.addRole = async (title, salary, departmentId) => {
  let role = new Role(title, salary, departmentId);
  role = await role.add();
};

// query to add new employee
exports.addEmployee = async (firstName, lastName, roleId, managerId) => {
  let employee = new Employee(firstName, lastName, roleId, managerId);
  employee = await employee.add();
};

// query to add new employee without a manager
exports.addEmployeeWithoutManager = async (firstName, lastName, roleId) => {
  let employee = new Employee(firstName, lastName, roleId, "NULL");
  employee = await employee.addNoManager();
};

// query to update employee role
exports.updateEmpRole = async (id, roleId) => {
  await Employee.updateRole(id, roleId);
};

// query to update manager id for an employee
exports.updateEmpManager = async (eId, mId) => {
  await Employee.updateManager(eId, mId);
};

// query to delete department
exports.deleteDepartment = async (id) => {
  await Department.delete(id);
};

// query to delete role
exports.deleteRole = async (id) => {
  await Role.delete(id);
};

// query to delete employ
exports.deleteEmployee = async (id) => {
  await Employee.delete(id);
};
