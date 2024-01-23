const inquirer = require('inquirer');
const db = require('./db/connection');
const { 
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  deleteEmployee,
  deleteDepartment
} = require('./lib/queries');

async function init() {
  // Inquirer prompt to ask the user what they want to do
  const { choice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'Delete an Employee',
        'Delete a Department and Associated Roles and Employees',
        'Exit'
        
      ],
    },
  ]);

  switch (choice) {
    case 'View All Departments':
      await viewDepartments();
      break;
    case 'View All Roles':
      await viewRoles();
      break;
    case 'View All Employees':
      await viewEmployees();
      break;
    case 'Add a Department':
      await addDepartment();
      break;
    case 'Add a Role':
      await addRole();
      break;
    case 'Add an Employee':
      await addEmployee();
      break;
    case 'Update an Employee Role':
      await updateEmployeeRole();
      break;
    case 'Delete an Employee':
      await deleteEmployee();
      break;
    case 'Delete a Department and Associated Roles and Employees':
      await deleteDepartment();
      break;
    case 'Exit':
      db.end();
      return;
    default:
      console.log(`Action not handles: ${choice}`);
    
  }

  init(); 
}

init();