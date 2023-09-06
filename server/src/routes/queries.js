const express = require('express');
const database = require('../config/database');
const router = express.Router();



// Client routes

router.get('/get_all_user_queries', (req, res) => {
      const id = req.query.student_id;
      database.query(`SELECT * FROM queries WHERE student_id = \'${id}\'`, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send(results);
        }
      });
});


router.post('/add_new_query', (req,res) => {
  const {idNumber, name, subject, description}= req.body;
  
  database.query(
    'INSERT INTO queries (student_id, student_name, subject, description, is_resolved) VALUES (?, ?, ?, ?, ?)',
    [ idNumber, name, subject, description, 0 ],
    (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send({ err });
        } else {
            res.status(200).send({ message: 'Query Submitted Successfully' });
        }
    }
  ); 
})



// Client routes

router.get('/get_all_active_queries', (req, res) => {
  
  database.query(`SELECT * FROM queries WHERE is_resolved = 0 ORDER BY id DESC`, (error, results) => {
    if (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    } else {
        res.status(200).send(results);
    }
  });
});


router.get('/get_all_resolved_queries', (req, res) => {
  
  database.query(`SELECT * FROM queries WHERE is_resolved = 1 ORDER BY id DESC`, (error, results) => {
    if (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    } else {
        res.status(200).send(results);
    }
  });
});


module.exports = router;