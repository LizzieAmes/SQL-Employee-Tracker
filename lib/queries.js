const db = require('../db/connection');
const inquirer = require('inquirer');

async function viewDepartments() {
  const [departments] = await db.query('SELECT * FROM department');
  console.table(departments);
}

async function viewRoles() {
  const [roles] = await db.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id');
  console.table(roles);
}

async function viewEmployees() {
  const [employees] = await db.query('SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, " ", m.last_name) AS manager FROM employee e LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee m ON e.manager_id = m.id');
  console.table(employees);
}

async function addDepartment() {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the department?',
    },
  ]);

  await db.query('INSERT INTO department (name) VALUES (?)', [name]);
  console.log(`Added ${name} to departments.`);
}

async function addRole() {
  const [departments] = await db.query('SELECT id, name FROM department');
  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const { title, salary, departmentId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the role title?',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary for this role?',
    },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Which department does this role belong to?',
      choices: departmentChoices
    }
  ]);

  await db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
  console.log(`Added ${title} role successfully.`);
}

async function addEmployee() {
  const [roles] = await db.query('SELECT id, title FROM role');
  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const [managers] = await db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee WHERE manager_id IS NULL');
  const managerChoices = managers.map(({ id, name }) => ({
    name,
    value: id
  }));
  managerChoices.unshift({ name: 'None', value: null });

  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: "What is the employee's first name?",
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the employee's last name?",
    },
    {
      type: 'list',
      name: 'roleId',
      message: "What is the employee's role?",
      choices: roleChoices
    },
    {
      type: 'list',
      name: 'managerId',
      message: "Who is the employee's manager?",
      choices: managerChoices
    }
  ]);

  await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
  console.log(`Added ${firstName} ${lastName} as a new employee.`);
}

async function updateEmployeeRole() {
  const [employees] = await db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee');
  const employeeChoices = employees.map(({ id, name }) => ({
    name,
    value: id
  }));

  const [roles] = await db.query('SELECT id, title FROM role');
  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { employeeId, roleId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Which employee\'s role do you want to update?',
      choices: employeeChoices
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Which role do you want to assign to the selected employee?',
      choices: roleChoices
    }
  ]);

  await db.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
  console.log('Employee role updated successfully.');
}

async function deleteEmployee() {
  const [employees] = await db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee');
  
  const employeeChoices = employees.map(employee => ({
    name: employee.name,
    value: employee.id
  }));
  
  const { employeeId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Which employee would you like to delete?',
      choices: employeeChoices
    }
  ]);
  await db.query('DELETE FROM employee WHERE id = ?', [employeeId]);
  console.log('Employee deleted successfully.');
}

async function deleteDepartment() {
  const [departments] = await db.query('SELECT id, name FROM department');

  const departmentChoices = departments.map(department => ({
    name: department.name,
    value: department.id
  }));

  const { departmentId } = await inquirer.prompt ([
    {
      type: 'list',
      name: 'departmentId',
      message: 'Which department would you like to delete?',
      choices: departmentChoices
    }
  ]);

  const { confirmDelete } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmDelete',
      message: 'WARNING: Deleting a department will also delete all associated roles and employees. Are you sure you want to proceed?',
      default: false
    }
  ]);

  if (confirmDelete) {
    const [roles] = await db.query('SELECT id FROM role WHERE department_id = ?', [departmentId]);
    for (const role of roles) {
      await db.query('DELETE FROM employee WHERE role_id = ?', [role.id]);
    }

  await db.query('DELETE FROM role WHERE department_id = ?', [departmentId]);
  await db.query('DELETE FROM department WHERE id = ?', [departmentId]);

  console.log('Department and associated roles and employees deleted successfully.');
} else {
  console.log('Department deletion canceled.')
}
}

module.exports = { 
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  deleteEmployee,
  deleteDepartment
 };