const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Omkar@123',
  database: 'library'
});

module.exports = pool.promise();