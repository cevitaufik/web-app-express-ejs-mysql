const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  database: 'littlefx_db',
  user: 'littlefx_admin',
  password: 'littlefx_admin1',
  multipleStatements: true,
});

module.exports = con;