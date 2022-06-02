require("dotenv").config(); // dotenv config file
const cTable = require("console.table"); // console.table module to print tables to the console
const DbQuery = require("./lib/DbQuery"); // DbQuery module to query the database
const Inquirer = require("./lib/InquirerCalls"); // Inquirer module to run inquirer prompts
const { color, log } = require("console-log-colors"); // color logger for console logging

// async main function to await all commands
async function main() {
  // initializing inquirer prompt
  const response = await Inquirer.init();

  // read the response from the user to decide the next prompt
  switch (response.choice) {
    // view all departments prompt
    case "view all departments":
      // receive department table from database
      const departments = await DbQuery.viewAllDepartments();
      console.table(departments); // log the table
      console.log('')
      break;

      // view all roles
    case "view all roles":
      // receive role table from database
      const roles = await DbQuery.viewAllRoles();
      console.table(roles); // log the table
      console.log('')
      break;

      // view all employees
    case "view all employees":
      // receive employee table from database
      const employees = await DbQuery.viewAllEmployees();
      console.table(employees); // log the table
      console.log('')
      break;

    case "add a department":
      const responseDep = await Inquirer.addDepartment();
      await DbQuery.addDepartment(responseDep.departmentName);
      log.greenBright(`${responseDep.departmentName} Department added`);
      console.log('')
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
      console.log('')
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
      console.log('')

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
      console.log('')
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
      console.log("");

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
      console.log("");

      break;

    case "view employees by department":
      const departmentResponse = await Inquirer.viewByDepartment();
      const departmentEmployees = await DbQuery.getEmpByDepartment(
        departmentResponse.department
      );
      console.table(departmentEmployees);
      console.log("");
      break;

    case "view budget":
      const budgetResponse = await Inquirer.viewBudget();
      const employeesInBudget = await DbQuery.getEmpByDepartment(
        budgetResponse.department
      );
      const budgetArray = await employeesInBudget.map(
        (employee) => employee.salary
      );

      log.greenBright(
        `The utilized budget for ${
          budgetResponse.department
        } is $${budgetArray.reduce((a, b) => parseInt(a) + parseInt(b), 0)}`
      );
      console.log("");
      break;

    case "delete employee":
      const deleteEmployee = await Inquirer.deleteEmployee();
      const [delFirstName, delLastName] = deleteEmployee.employee.split(" ");
      const deleteEmpId = await DbQuery.getEmpByName(delFirstName, delLastName);

      await DbQuery.deleteEmployee(deleteEmpId);

      log.greenBright(`${deleteEmployee.employee} employee deleted`);
      console.log("");
      break;

    case "delete role":
      const deleteRole = await Inquirer.deleteRole();
      const deleteRoleID = await DbQuery.getRoleByName(deleteRole.role);
      await DbQuery.deleteRole(deleteRoleID);
      log.greenBright(`${deleteRole.role} role deleted`);
      console.log("");
      break;

    case "delete department":
      const deleteDepartment = await Inquirer.deleteDepartment();
      const deleteDepartmentID = await DbQuery.getDepByName(
        deleteDepartment.department
      );

      await DbQuery.deleteDepartment(deleteDepartmentID);
      log.greenBright(`${deleteDepartment.department} department deleted`);
      console.log("");
      break;

      // if exit case then kill app
    case "exit":
      process.exit(0);
  }
  return main();
}

main();
