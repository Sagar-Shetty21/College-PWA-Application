const express = require('express');
const bodyParser = require('body-parser');
const database = require('./config/database');
const authentication = require('./routes/authentication');
const cors = require('cors');

const app = express();

// parse application/json
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
// connect to the database
database.connect();

app.use('/authentication', authentication);

// start the server
app.listen(8080, () => {
    console.log('Server listening on port 8080');
});
