-- generate seed data for department, role and employee tables
INSERT INTO department (name)
VALUES ('Engineering'),
    ('Admin'),
    ('HR'),
    ('Finance'),
    ('C-Level');
INSERT INTO role(title, salary, department_id)
VALUES ('Junior Engineer', 70000, 1),
    ('Senior Engineer', 100000, 1),
    ('Office Admin', 55000, 2),
    ('HR Admin', 65000, 3),
    ('Lead Engineer', 130000, 1),
    ('Accounts Manager', 130000, 4),
    ('HR Manager', 130000, 3),
    ('Managing Director', 210000, 5);
INSERT INTO employee(first_name, last_name, role_id)
VALUES ('Fion', 'Hirsch', 1),
    ('Caelie', 'Colton', 1),
    ('Amber', 'Jacobson', 2),
    ('Oli', 'Traves', 2),
    ('Isdore', 'Underwood', 3),
    ('Ennis', 'Brie', 4),
    ('Riannon', 'Denman', 4),
    ('Bishop', 'Fleming', 5),
    ('Eleanora', 'Kinsey', 6),
    ('Reynard', 'Michaels', 6),
    ('Stacey', 'Varnham', 7),
    ('Lyn', 'Alfredson', 8);
UPDATE employee
SET manager_id = 8
WHERE role_id = 1
    OR role_id = 2;
UPDATE employee
SET manager_id = 11
WHERE role_id = 3
    OR role_id = 4;
UPDATE employee
SET manager_id = 12
WHERE role_id = 5
    OR role_id = 6
    OR role_id = 7;