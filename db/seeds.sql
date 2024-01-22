USE my_company_db;

INSERT INTO department (name) VALUES
('Engineering'),
('Marketing'),
('Human Resources'),
('Finance'); 


INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 90000, 1),
('Senior Software Engineer', 120000, 1),
('Marketing Coordinator', 60000, 2),
('HR Manager', 60000, 3),
('Finance Analyst', 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Tom', 'Haverford', 2, NULL),
('Donna', 'Meagle', 1, 1),
('Ron', 'Swanson', 3, NULL),
('Leslie', 'Knope', 4, NULL),
('Ben', 'Wyatt', 5, NULL);

