INSERT INTO department (name)
VALUES ('Engineering'),
    ('Admin'),
    ('Leaders');

INSERT INTO role(title, salary, department_id)
VALUES ('Junior Engineer', 70000, 1),
    ('Senior Engineer', 100000, 1),
    ('Office Admin', 55000, 2),
    ('HR Admin', 65000, 2),
    ('Lead Engineer', 130000, 3),
    ('HR Manager', 130000, 3),
    ('General Manager', 150000, 3);

INSERT INTO employee(first_name, last_name, role_id)
VALUES ('Fion', 'Hirsch', 1),
('Fion', 'Hirsch', 1),
('Fion', 'Hirsch', 2),
('Fion', 'Hirsch', 3),
('Fion', 'Hirsch', 4),
('Fion', 'Hirsch', 4),
('Fion', 'Hirsch', 5),
('Fion', 'Hirsch', 6),
('Fion', 'Hirsch', 7);
