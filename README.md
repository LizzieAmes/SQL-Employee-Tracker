# EMPLOYEE TRACKER
## DESCRIPTION
This Employee Tracker is a command-line application designed to help businesses manage their company's departments, roles, and employees efficiently. Utilizing a MySQL database, this application provides a user-friendly interface for viewing and interacting with employee data, streamlining the process of organizing and planning business resources.

## FEATURES
* View Departments: Display all departments, including names and IDs.
* View Roles: Show all roles, including titles, department affiliations, IDs, and salaries.
* View Employees: List all employees with details such as IDs, names, roles, departments, and managers.
* Add a Department: Easily add new departments to the database.
* Add a Role: Insert new roles with associated salaries and departments.
* Add an Employee: Add new employees with their role and manager information.
* Update Employee Role: Change the role of existing employees.

## INSTALLATION
1. Clone the repository:
git clone https://github.com/LizzieAmes/SQL-Employee-Tracker

2. Navigate to the project directory:
cd employee-tracker

3. Install dependencies:
npm install

4. Set up the database:
Log into your MySQL shell and run the following:
SOURCE db/schema.sql;
SOURCE db/seeds.sql;
This will create the database and seed it with initial data.

5. Configure your database connection:
Update db/connection.js with your MySQL user and password.

## USAGE
To start the application, run the following command in your terminal:
node index.js

## TECHNOLOGY
* Node.js: JavaScript runtime environment for executing JavaScript code server-side.
* MySQL: Open-source relational database management system.
* Inquirer.js: Library for creating interactive command-line user interfaces.