const mysql = require('mysql');
require('dotenv').config();

// create a connection to the SQL database
const database = mysql.createConnection({
    host: process.env.DATABASE_ENDPOINT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

module.exports = database;