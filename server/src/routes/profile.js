const express = require('express');
const database = require('../config/database');
const router = express.Router();
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    }
})


router.post('/update',(req, res) => {
    console.log(req.body)
})



module.exports = router;