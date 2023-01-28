const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

// parse application/json
app.use(bodyParser.json());

// create a connection to the SQL database
const connection = mysql.createConnection({
    host: 'localhost:3306',
    user: 'root',
    password: 'itsokay',
    database: 'silicon_app_database'
});

// connect to the database
connection.connect();

// endpoint to handle /register requests
app.post('/register', (req, res) => {
    const { email, password, name } = req.body;
    // insert the data into the database
    connection.query(
        'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
        [email, password, name],
        (error, results) => {
            if (error) {
                res.status(500).send({ error });
            } else {
                res.status(200).send({ message: 'User registered successfully' });
            }
        }
    );
});

// start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
