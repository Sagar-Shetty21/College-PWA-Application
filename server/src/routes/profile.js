const express = require('express');
const database = require('../config/database');
const router = express.Router();


router.post('/update',(req, res) => {
    const id = req.body.regNo;
    const image = req.body.image.base64Data;
    
    database.query(
        `UPDATE registered_students SET profile_img = \'${image}\' WHERE student_id = \'${id}\';`,
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send({ err });
            } else {
                res.status(200).send({ message: 'Image Updated Successfully!' });
            }
        }
    ); 
})



module.exports = router;