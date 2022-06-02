# Employee-Tracker

![badge for MIT](https://img.shields.io/badge/license-MIT-brightgreen)

## Description
- Develop a employee tracker app to run in the command line environment.
- Application allows business owners to view and manage their business.
- Application interacts with a SQL database and gets user inputs from inquirer.
- Main technologies used by the application are node.js, MySQL, inquirer, dotenv and console.table.
- When the application is started the user is prompted with multiple options:
    - View all departments
    - View all employees
    - View all roles
    - Add a department
    - Add a role
    - Add an employee
    - Update an employee role
    - Update employee managers (bonus)
    - View employees by manager (bonus)
    - View employees by department (bonus)
    - Delete departments, roles, and employees (bonus)
    - View the total utilized budget of a department (bonus)

Below is the application schema:
![Schema for the employees_db database with 3 tables, department, role and employee.](./assets/images/schema.png)

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [License](#license)
4. [Contributing](#contributing)
5. [Tests](#tests)
6. [Questions](#questions)

## Installation
- To install the application please follow the instructions below.
```bash
- git clone git@github.com:daman29/employee-tracker.git
- npm i
```
- Then in MySQL source the schema file and the seeds.
```bash
- source schema.sql;
- source seeds.sql;
```

## Usage
- Run the application with the following command:
```bash
- npm start
```
- Visit the application repository at [GitHub Repository](https://github.com/daman29/employee-tracker)

- [Click on this link](https://youtu.be/EK8SbDy6TwU) to view the video demo of the application.

The GIF below shows the application's appearance and functionality.

![Application run through as a GIF](./assets/images/demo-gif.gif)


## License
- This application is licensed under the MIT License

## Contributing
- Clone repository first using git clone
- Contribute your changes to a new branch

## Tests
- No test commands

## Questions
- Reach me via email at damneet.sambhy@hotmail.com or issues on [github](https://github.com/daman29)