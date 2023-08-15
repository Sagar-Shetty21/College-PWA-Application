const express = require('express');
const database = require('../config/database');
const router = express.Router();


router.get('/get_details', (req, res) => {

    const details = {
        totalStudents: 0,
        totalStaffs: 0,
        registeredStudents: 0,
        registeredStaffs: 0
    }

    database.query(`SELECT COUNT(*) FROM all_students;`, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            details.totalStudents = results[0]['COUNT(*)'];
            
            database.query(`SELECT COUNT(*) FROM all_staffs;`, (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).send('Internal Server Error');
                } else {
                    details.totalStaffs = results[0]['COUNT(*)'];
                    
                    database.query(`SELECT COUNT(*) FROM registered_students;`, (error, results) => {
                        if (error) {
                            console.error(error);
                            res.status(500).send('Internal Server Error');
                        } else {
                            details.registeredStudents = results[0]['COUNT(*)'];
                            
                            database.query(`SELECT COUNT(*) FROM registered_staffs;`, (error, results) => {
                                if (error) {
                                    console.error(error);
                                    res.status(500).send('Internal Server Error');
                                } else {
                                    details.registeredStaffs = results[0]['COUNT(*)'];
                                    
                                    console.log(details); 
                                    res.status(200).send(details);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});



module.exports = router;