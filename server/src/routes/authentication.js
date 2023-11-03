const express = require('express');
const database = require('../config/database');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();


                                   /* user registration */
router.post('/register', (req, res) => {
    const { idNumber, name, gender, section, designation, email, phone, password, type, image } = req.body;
    // insert the data into the database
    if(type === "student"){
        database.query(
            'INSERT INTO registered_students (student_id, name, section, gender, email, phone, password, profile_img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [ idNumber, name, section, gender, email, phone, password, image ],
            (err, results) => {
                if (err) {
                    res.status(500).send({ err });
                } else {
                    res.status(200).send({ message: 'User registered successfully' });
                }
            }
        ); 
    }else{
        database.query(
            'INSERT INTO registered_staffs (staff_id, name, designation, gender, email, phone, password, profile_img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [ idNumber, name, designation, gender, email, phone, password, image ],
            (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ error });
                }else {
                    console.log('User registered successfully');
                    res.status(200).json({ message: 'User registered successfully' });
                }
            }
        ); 
    }
    
    
});

router.get('/verifyid', (req,res) => {
    const idNumber = req.query.idNumber;
    const accType = req.query.accType;
    if(accType === "student"){
        database.query(`SELECT * FROM all_students WHERE student_id = '${idNumber}'`,(err, result) => {
            if(err){
                res.status(500).json({ error: err });
            }else if(result.length === 0){
                res.status(404).json({ error: {code: 'ID number not found in database'} });
            }else{
                res.send({ result });
            }
        });
    }else{
        database.query(`SELECT * FROM all_staffs WHERE staff_id = '${idNumber}'`,(err, result) => {
            if(err){
                res.status(500).json({ error: err });
                console.log(err);
            }else if(result.length === 0){
                res.status(404).json({ error: {code: 'ID number not found in database'} });
            }else{
                res.send({ result });
            }
        });
    }
});

router.get('/getprofileimg', (req,res) => {
    const id = req.query.id;
    //search for the user in database
    database.query(`
        SELECT * FROM registered_students
        WHERE student_id = '${id}'
        UNION
        SELECT * FROM registered_staffs
        WHERE staff_id = '${id}'
        LIMIT 1    
    `,(err, result) =>{
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            console.log(result)
            res.status(200).send(result);
        }
    })
})

                               /*  user login */
router.post('/login', (req,res) => {
    const {userId, password} = req.body;
    //search for the user in database
    console.log(req.body)
    database.query(`
        SELECT *
        FROM
        (SELECT student_id, name, section, gender, email, phone, password FROM registered_students
        WHERE student_id = '${userId}' AND password = '${password}') AS student
        UNION
        SELECT *
        FROM
        (SELECT staff_id, name, designation, gender, email, phone, password FROM registered_staffs
        WHERE staff_id = '${userId}' AND password = '${password}') AS staff
        LIMIT 1    
    `,(err, result) =>{
        console.log(err)
        let data = result[0] ? result[0] : null
        if(err){
            res.status(500).json({ error: err });
        }else if(data === null){
            res.status(401).json("Not Authorized");
        }else {
            const userId = data.student_id || data.staff_id
            const accessToken = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET_CODE)
            console.log(result[0])
            res.send({ result: result[0], accessToken: accessToken });
        }
    })
})


function verifyToken(req,res,next) {
    console.log(req)
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_CODE, (err, user) => {
            if(err){
                console.log(err);
                return res.status(403).json("Token is not valid!");
            }
            req.user = user
            next()
        })
    }else{
        res.status(401).json("You are not authenticated!");
    }
}








                                      /* ADMIN ROUTES */


router.post('/login/admin', (req,res) => {
    const {userId, password} = req.body;
    
    console.log(req.body)
    database.query(`
        SELECT * 
        FROM admins
        WHERE admin_id = '${userId}' AND password = '${password}'
    `,(err, result) =>{
        console.log(result[0])
        if(err){
            res.status(500).json({ error: err });
        }if(!result[0]){
            res.status(400).json("User not authorized");
        }else{
            res.status(200).json(result[0]);
        }
    })
})



module.exports = router;