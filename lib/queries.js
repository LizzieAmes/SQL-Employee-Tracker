const db = require('../db/connection');

async function viewDepartments() {
  const [departments] = await db.query('SELECT * FROM department');
  console.log('\n');
  console.table(departments);
}

module.exports = { viewDepartments };