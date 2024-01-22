const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: null,
  database: 'my_company_db'
});

module.exports = db.promise();