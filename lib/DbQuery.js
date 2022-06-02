const cTables = require("console.table");
const Department = require("../models/Department");
const Employee = require("../models/Employee");
const Role = require("../models/Role");

exports.viewAllDepartments = async () => {
  const [departments, _] = await Department.getAll();
  return departments;
};

exports.viewAllEmployees = async () => {
  const [employees, _] = await Employee.getAll();
  return employees;
};

exports.viewAllRoles = async () => {
  const [roles, _] = await Role.getAll();
  return roles;
};

exports.getDepartments = async () => {
  const [departments, _] = await Department.getAllDepartmentsRaw();
  return departments;
};

exports.getEmployees = async () => {
  const [employees, _] = await Employee.getAllEmployeesRaw();
  return employees;
};

exports.getRoles = async () => {
  const [roles, _] = await Role.getAllRolesRaw();
  return roles;
};

exports.getDepByName = async (name) => {
  const [dep, _] = await Department.getDepId(name);
  return dep[0].id;
};

exports.getDepById = async (id) => {
  const [dep, _] = await Department.getDepName(id);
  return dep[0].name;
};

exports.getEmpByName = async (firstName, lastName) => {
  const [emp, _] = await Employee.getEmployeeId(firstName, lastName);

  return emp[0].id;
};

exports.getEmpByManager = async (id) => {
  const [emp, _] = await Employee.getFromManagerId(id);
  return emp;
};

exports.getEmpByDepartment = async (department) => {
  const [emp, _] = await Employee.getFromDepartment(department);
  return emp;
};

exports.getRoleByName = async (name) => {
  const [role, _] = await Role.getRoleId(name);
  return role[0].id;
};

exports.addDepartment = async (departmentName) => {
  let department = new Department(departmentName);
  department = await department.add();
};

exports.addRole = async (title, salary, departmentId) => {
  let role = new Role(title, salary, departmentId);
  role = await role.add();
};

exports.addEmployee = async (firstName, lastName, roleId, managerId) => {
  let employee = new Employee(firstName, lastName, roleId, managerId);
  employee = await employee.add();
};

exports.addEmployeeWithoutManager = async (firstName, lastName, roleId) => {
  let employee = new Employee(firstName, lastName, roleId, "NULL");
  employee = await employee.addNoManager();
};

exports.updateEmpRole = async (id, roleId) => {
  const newRole = await Employee.updateRole(id, roleId);
};

exports.updateEmpManager = async (eId, mId) => {
  const newManager = await Employee.updateManager(eId, mId);
};
