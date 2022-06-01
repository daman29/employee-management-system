require("dotenv").config();
const cTable = require("console.table");
const DbQuery = require("./lib/DbQuery");
const Inquirer = require("./lib/InquirerCalls");

// DbQuery.viewAllDepartments();
// DbQuery.viewAllEmployees();
// DbQuery.viewAllRoles();

// DbQuery.addDepartment("Cleaners")
// DbQuery.addRole("Graduate Engineer", 40000, 2);
// DbQuery.addEmployee("jatt", "moosewala", 2, 1);

async function main() {
  const response = await Inquirer.init();

  switch (response.choice) {
    case "addRole":
      const response = await Inquirer.addRole();
      await DbQuery.addRole(
        response.name,
        response.salary,
        response.departmentId
      );
      break;
    case "viewDepartments":
      break;
  }
}

main();
