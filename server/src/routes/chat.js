const express = require('express');
const database = require('../config/database');
const router = express.Router();


router.get('/get_available_contacts', (req, res) => {
    database.query(`SELECT * FROM registered_students UNION ALL SELECT * FROM registered_staffs`, (error, results) => {
      if (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
      } else {
          res.status(200).send(results);
      }
    });
});



const io = require('socket.io')(3002, {
    cors: {
        origin: ["http://localhost:3000"]
    }
})

io.on('connection' ,socket => {
    console.log(socket.id)
})


module.exports = router;