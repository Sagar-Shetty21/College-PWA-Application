const express = require('express');
const database = require('../config/database');
const router = express.Router();

router.post('/create', (req,res) => {
  const text = req.body.text;
  const images = `${req.body.images.base64DataArray}`;
  
  database.query(
    `INSERT INTO campus_posts (textData, images) VALUES (?, ?)`,
    [ text, images],
    (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send({ err });
        } else {
            res.status(200).send({ message: 'Post Submitted Successfully!' });
        }
    }
  ); 
})

router.get('/all_posts', (req,res) => {
  
  database.query(
    `SELECT * FROM campus_posts ORDER BY createdAt DESC LIMIT 20`,
    (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send({ err });
        } else {
            res.status(200).send(results);
        }
    }
  ); 
})


module.exports = router;





