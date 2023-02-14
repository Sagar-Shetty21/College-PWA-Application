const mysql = require('mysql');

// create a connection to the SQL database
const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'silicon_app_database'
});

module.exports = database;