const express = require('express');
const bodyParser = require('body-parser');
const database = require('./config/database');
const authentication = require('./routes/authentication');
const manageusers = require('./routes/manage-users');
const queries = require('./routes/queries');
const admindashboard = require('./routes/admin-dashboard');
const chat = require('./routes/chat');
const profile = require('./routes/profile')
const quotes = require('./routes/quotes')
const posts = require('./routes/campus-posts')
const cors = require('cors');

const app = express();

// parse application/json
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
// connect to the database
database.connect();

app.use('/authentication', authentication);
app.use('/manage-users', manageusers);
app.use('/queries', queries);
app.use('/admin-dashboard',admindashboard);
app.use('/chat',chat)
app.use('/quotes', quotes)
app.use('/profile', profile)
app.use('/posts', posts)

// start the server
app.listen(8080, () => {
    console.log('Server listening on port 8080');
});
