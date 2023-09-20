const express = require('express');
const database = require('../config/database');
const router = express.Router();

/* const io = require('socket.io')(5000, {
    cors: {
        origin: ["http://localhost:3000"]
    }
})

io.on('connection', (socket) => {
    const id = socket.handshake.query.id;
    socket.join(id)

    socket.on('send-message', ({recipients, text}) => {
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r !== recipient)
            newRecipients.push(id)
            socket.broadcast.to(recipient).emit('receive-message', {
                recipients: newRecipients, sender: id, text
            })
        })
    })
}) */ 


router.get('/get_available_contacts', (req, res) => {
    const id = req.query.id;
    
    database.query(`SELECT * FROM registered_students WHERE student_id <> \'${id}\'`, (errorStudents, resultStudents) => {
      if (errorStudents) {
          console.error(errorStudents);
          res.status(500).send('Internal Server Error');
      } 
        database.query(`SELECT * FROM registered_staffs WHERE staff_id <> \'${id}\'`, (errorStaffs, resultStaffs) => {
            if (errorStaffs) {
                console.error(errorStaffs);
                res.status(500).send('Internal Server Error');
            }
            const mergedData = [...resultStudents, ...resultStaffs];
            res.status(200).send(mergedData);
        });
    });
});


module.exports = router;