const inquirer = require("inquirer");
const DbQuery = require("./DbQuery");

exports.init = async () => {
  const response = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "What do you want to do?",
      choices: ["add role", "view departments", "exit"],
    },
  ]);
  return response;
};

exports.addRole = async () => {
  const departments = await DbQuery.viewAllDepartments();
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
          console.log("Please enter a number value, press up arrow to change input");
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
