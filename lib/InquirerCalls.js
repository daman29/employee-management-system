const inquirer = require("inquirer");
const DbQuery = require("./DbQuery");

const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

exports.init = async () => {
  const response = await inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What do you want to do?",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
          "update an employee manager",
          "view employees by manager",
          "view employees by department",
          "delete employee",
          "delete role",
          "delete department",
          "exit",
        ],
      },
    ])
    .catch((err) => {
      console.error(err);
    });
  return response;
};

exports.addRole = async () => {
  const departments = await DbQuery.getDepartments();
  const response = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Please enter the role name: ",
    },
    {
      type: "number",
      name: "salary",
      message: "Please enter the salary for the role:",
      validate: function (input) {
        if (isNaN(input)) {
          console.log(
            "Please enter a number value, press up arrow to change input"
          );
          return false;
        } else {
          return true;
        }
      },
    },
    {
      type: "list",
      name: "department",
      message: "Please choose the department for the role:",
      choices: function (input) {
        input = departments.map((department) => department.name);

        return input;
      },
    },
  ]);
  return response;
};

exports.addDepartment = async () => {
  const response = await inquirer
    .prompt([
      {
        name: "departmentName",
        message: "Please enter the new department name: ",
      },
    ])
    .catch((err) => {
      console.error(err);
    });
  return response;
};

exports.addEmployee = async () => {
  const roles = await DbQuery.getRoles();
  const employees = await DbQuery.getEmployees();
  const response = await inquirer
    .prompt([
      {
        name: "firstName",
        message: "Please enter new employees' first name: ",
      },
      {
        name: "lastName",
        message: "Please enter new employees' last name: ",
      },
      {
        type: "list",
        name: "role",
        message: "Please choose a role for the employee:",
        choices: function (input) {
          input = roles.map((role) => role.title);

          return input;
        },
      },
      {
        type: "list",
        name: "manager",
        message: "Please choose a manager for the employee:",
        choices: function (input) {
          input = employees.map((employee) => {
            return employee.first_name + " " + employee.last_name;
          });

          input.push("NULL");

          return input;
        },
      },
    ])
    .catch((err) => console.error(err));
  return response;
};

exports.updateEmployeeRole = async () => {
  const employees = await DbQuery.getEmployees();
  const roles = await DbQuery.getRoles();
  const response = await inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Please select an employee to update:",
        choices: function (input) {
          input = employees.map((employee) => {
            return employee.first_name + " " + employee.last_name;
          });
          return input;
        },
      },
      {
        type: "list",
        name: "role",
        message: "Please select the new role for this employee:",
        choices: function (input) {
          input = roles.map((role) => role.title);
          return input;
        },
      },
    ])
    .catch((err) => {
      console.error(err);
    });
  return response;
};

exports.updateEmployeeManager = async () => {
  const employees = await DbQuery.getEmployees();
  const response = await inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Please select an employee to update:",
        choices: function (input) {
          input = employees.map((employee) => {
            return employee.first_name + " " + employee.last_name;
          });
          return input;
        },
      },
      {
        type: "list",
        name: "manager",
        message: "Please select a new manager:",
        choices: function (input) {
          input = employees.map((employee) => {
            return employee.first_name + " " + employee.last_name;
          });
          return input;
        },
      },
    ])
    .catch((err) => {
      console.error(err);
    });
  return response;
};

exports.viewByManager = async () => {
  const employees = await DbQuery.viewAllEmployees();
  let managers = employees.map((employee) => {
    return employee.manager_name;
  });

  const response = await inquirer
    .prompt([
      {
        type: "list",
        name: "managerName",
        message: "Please select a manager to view employees:",
        choices: function (input) {
          input = managers.filter(onlyUnique).map(String);
          return input;
        },
      },
    ])
    .catch((err) => console.error(err));
  return response;
};

exports.viewByDepartment = async () => {
  const departments = await DbQuery.getDepartments();
  const response = await inquirer
    .prompt([
      {
        type: "list",
        name: "department",
        message: "Please select department to filter employees:",
        choices: function (input) {
          input = departments.map((dep) => dep.name);
          return input;
        },
      },
    ])
    .catch((err) => {
      console.error(err);
    });
  return response;
};

exports.deleteDepartment = async () => {
  const departments = await DbQuery.getDepartments();
  const response = await inquirer
    .prompt([
      {
        type: "list",
        name: "department",
        message: "Please select department to delete:",
        choices: function (input) {
          input = departments.map((dep) => dep.name);
          return input;
        },
      },
    ])
    .catch((err) => {
      console.error(err);
    });
  return response;
};

exports.deleteRole = async () => {
  const roles = await DbQuery.getRoles();
  const response = await inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Please select role to delete:",
        choices: function (input) {
          input = roles.map((role) => role.title);
          return input;
        },
      },
    ])
    .catch((err) => {
      console.error(err);
    });
  return response;
};

exports.deleteEmployee = async () => {
  const employees = await DbQuery.getEmployees();
  const response = await inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Please select an employee to delete:",
        choices: function (input) {
          input = employees.map((employee) => {
            return employee.first_name + " " + employee.last_name;
          });
          return input;
        },
      },
    ])
    .catch((err) => {
      console.error(err);
    });
  return response;
};