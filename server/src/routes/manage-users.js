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


router.get('/allstudents', (req, res) => {
  database.query('SELECT * FROM all_students', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send(results);
    }
  });
});



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
    console.log(req.body);
    database.query(`DELETE FROM all_staffs WHERE staff_id = '${regno}'`, (error1, results1, fields1) => {
    if (error1) throw error1
    database.query(`DELETE FROM registered_staffs WHERE staff_id = '${regno}'`, (error2, results2, fields2) => {
      if (error2) throw error2
      
      res.send({results1,results2})
      })
    })
  })



                   /*   remove student    */

router.post('/removestudent', (req, res) => {
    const regno = req.body.regno
    console.log(req.body);
    database.query(`DELETE FROM all_students WHERE student_id = '${regno}'`, (error1, results1, fields1) => {
    if (error1) throw error1
      database.query(`DELETE FROM registered_students WHERE student_id = '${regno}'`, (error2, results2, fields2) => {
      if (error2) throw error2
      
      res.send({results1,results2})
      })
    })
})


//     search staff

router.post('/getstaff', (req,res) => {
  const searchData = req.body.regno
  database.query(`SELECT * FROM all_staffs WHERE staff_id LIKE '%${searchData}%';`, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send(results);
    }
  })
})



//     search student

router.post('/getstudent', (req,res) => {
  const searchData = req.body.regno
  database.query(`SELECT * FROM all_students WHERE student_id LIKE '%${searchData}%';`, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send(results);
    }
  })
})





module.exports = router;