const inquirer = require('inquirer');
const db = require('./db/connection');
const { viewDepartments, addDepartment } = require('./lib/queries');

async function init() {
  // Inquirer prompt to ask the user what they want to do
  const { choice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        
      ],
    },
  ]);

  switch (choice) {
    case 'View All Departments':
      await viewDepartments();
      break;
    
  }

  init(); 
}

init();