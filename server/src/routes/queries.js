const express = require('express');
const database = require('../config/database');
const router = express.Router();


router.get('/get_all_public_queries', (req, res) => {
      database.query(`SELECT * FROM queries WHERE is_private = 0`, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send(results);
            console.log(results)
        }
      });
});




module.exports = router;