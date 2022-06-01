--@block -- show department
SELECT id AS department_id, name AS department_name FROM department;

--@block -- show roles
SELECT  role.id AS role_id, role.title AS job_title, department.name as department_name, role.salary 
FROM role
JOIN department on role.department_id = department.id;

--@block -- show employee
SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS job_title, department.name as department_name, role.salary, CONCAT(m.first_name, ' ' , m.last_name) AS manager_name
FROM employee
JOIN role on employee.role_id = role.id
JOIN department on role.department_id = department.id
JOIN employee m on m.id = employee.manager_id;