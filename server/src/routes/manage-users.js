const express = require('express');
const database = require('../config/database');
const router = express.Router();





                  /*   load staff data    */
router.get('/allstaffs', (req, res) => {
  database.query('SELECT * FROM all_staffs', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send(results);
    }
  });
});



                  /*   load student data     */





                  /*   Add  staff     */
router.post('/addstaff', (req,res) => {
    const {regId, name, designation, gender} = req.body;
    
    console.log(req.body)
    database.query(`
    INSERT INTO all_staffs (staff_id, name, designation, gender) VALUES ('${regId}', '${name}', '${designation}', '${gender}');
    `,(err, results) =>{
        console.log(results)
        if(err){
            res.status(500).json({ err });
        }else{
            res.status(200).json("User added successfully!");
        }
    })
})


                  /*   Add  student     */


router.post('/addstudent', (req,res) => {
    const {regId, name, section, gender} = req.body;
    
    console.log(req.body)
    database.query(`
    INSERT INTO all_students (student_id, name, section, gender) VALUES ('${regId}', '${name}', '${section}', '${gender}');
    `,(err, results) =>{
        console.log(results)
        if(err){
            res.status(500).json({ err });
        }else{
            res.status(200).json("User added successfully!");
        }
    })
})                



                  /*   remove staff    */
  router.post('/removestaff', (req, res) => {
    const regno = req.body.regno
    database.query(`DELETE FROM all_staffs WHERE staff_id = '${regno}'`, (error, results, fields) => {
    if (error) throw error
      res.send(results)
    })
  })



                   /*   remove student    */




                    /*   edit staff    */




                     /*   edit student    */






module.exports = router;