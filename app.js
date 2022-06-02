require("dotenv").config();
const cTable = require("console.table");
const DbQuery = require("./lib/DbQuery");
const Inquirer = require("./lib/InquirerCalls");
const { color, log } = require("console-log-colors");

// DbQuery.viewAllDepartments();
// DbQuery.viewAllEmployees();
// DbQuery.viewAllRoles();
// async function main() {
//   const response = await DbQuery.getEmployees();
//   console.log(response);
// }
// main();

// DbQuery.addDepartment("Cleaners")
// DbQuery.addRole("Graduate Engineer", 40000, 2);
// DbQuery.addEmployee("jatt", "moosewala", 2, 1);

async function main() {
  const response = await Inquirer.init();

  switch (response.choice) {
    case "view all departments":
      const departments = await DbQuery.viewAllDepartments();
      console.table(departments);
      break;

    case "view all roles":
      const roles = await DbQuery.viewAllRoles();
      console.table(roles);
      break;

    case "view all employees":
      const employees = await DbQuery.viewAllEmployees();
      console.table(employees);
      break;

    case "add a department":
      const responseDep = await Inquirer.addDepartment();
      await DbQuery.addDepartment(responseDep.departmentName);
      log.greenBright(`${responseDep.departmentName} Department added`);
      break;

    case "add a role":
      const responseRole = await Inquirer.addRole();
      responseRole.department = await DbQuery.getDepByName(
        responseRole.department
      );
      await DbQuery.addRole(
        responseRole.name,
        responseRole.salary,
        responseRole.department
      );
      log.greenBright(`${responseRole.name} Role added`);
      break;

    case "add an employee":
      const responseEmployee = await Inquirer.addEmployee();

      responseEmployee.role = await DbQuery.getRoleByName(
        responseEmployee.role
      );

      if (responseEmployee.manager !== "NULL") {
        const [firstName, lastName] = await responseEmployee.manager.split(" ");
        responseEmployee.manager = await DbQuery.getEmpByName(
          firstName,
          lastName
        );
        await DbQuery.addEmployee(
          responseEmployee.firstName,
          responseEmployee.lastName,
          responseEmployee.role,
          responseEmployee.manager
        );
      } else {
        await DbQuery.addEmployeeWithoutManager(
          responseEmployee.firstName,
          responseEmployee.lastName,
          responseEmployee.role
        );
      }

      log.greenBright(
        responseEmployee.firstName +
          " " +
          responseEmployee.lastName +
          " has been added"
      );

      break;

    case "update an employee role":
      const responseUpdateRole = await Inquirer.updateEmployeeRole();
      const [firstName, lastName] = await responseUpdateRole.employee.split(
        " "
      );

      responseUpdateRole.employee = await DbQuery.getEmpByName(
        firstName,
        lastName
      );

      responseUpdateRole.role = await DbQuery.getRoleByName(
        responseUpdateRole.role
      );

      await DbQuery.updateEmpRole(
        responseUpdateRole.employee,
        responseUpdateRole.role
      );

      log.greenBright(`Role has been updated`);

      break;

    case "update an employee manager":
      const responseUpdateManager = await Inquirer.updateEmployeeManager();

      const [eFirstName, eLastName] =
        await responseUpdateManager.employee.split(" ");

      responseUpdateManager.employee = await DbQuery.getEmpByName(
        eFirstName,
        eLastName
      );

      const [mFirstName, mLastName] = await responseUpdateManager.manager.split(
        " "
      );

      responseUpdateManager.manager = await DbQuery.getEmpByName(
        mFirstName,
        mLastName
      );

      await DbQuery.updateEmpManager(
        responseUpdateManager.employee,
        responseUpdateManager.manager
      );

      log.greenBright("Employee manager updated");

      break;

    case "view employees by manager":
      const manager = await Inquirer.viewByManager();
      if (manager.managerName !== "null") {
        const [managerFirst, managerLast] = await manager.managerName.split(
          " "
        );
        manager.managerName = await DbQuery.getEmpByName(
          managerFirst,
          managerLast
        );
      }

      const managerResponse = await DbQuery.getEmpByManager(
        manager.managerName
      );

      console.table(managerResponse);

      break;

    case "view employees by department":
      const departmentResponse = await Inquirer.viewByDepartment();
      const departmentEmployees = await DbQuery.getEmpByDepartment(
        departmentResponse.department
      );
      console.table(departmentEmployees);
      break;

    case "exit":
      process.exit(0);
  }
  return main();
}

main();
