const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = require('../db');
const Schema = db.Schema;
// const cors = require('cors');

// const corsOptions = {
//   origin: 'http://localhost:3000'
// }

const ClassroomSchema = new Schema({
  Name: String,
  Students: [String],
  Instructor: { type: String, required: true },
  ClassCode: String,
})

const InstructorSchema = new Schema({
  Classes: [String],
  Email: String,
  Password: String,
  Prefix: String,
  Token: String,
})

const StudentSchema = new Schema({
  StudentId: Number,
  FullName: String,
  DaysPresent: [{type: Date}],
  DaysLate: [{type: Date}],
  DaysUnexcusedAbsences: [{type: Date}],
  DaysExcusedAbsences: [{type: Date}],
  Classes: [String],
  AttendanceCode: String,
  ClassCurrentlyHoldingAttendance: String,
  Email: String,
  Password: String,
  Token: String,
})

const Classroom = mongoose.model('Classroom', ClassroomSchema);
const Instructor = mongoose.model('Instructor', InstructorSchema);
const Student = mongoose.model('Student', StudentSchema); 

router.post('/createinstructor', function(req, res, next) {
  Instructor.create({ Email: req.body.email, Password: req.body.password }, function(err, instructor_instance){
    if (err) return handleError(err);
    return instructor_instance
  })
  res.send('respond with a resource');
});

// student routes
router.post('/createstudent', function(req, res, next) {
  Student.create({ 
    Email: req.body.email, 
    Password: req.body.password,
    StudentId: parseInt(req.body.id),
    FullName: req.body.first_name + ' ' + req.body.last_name,
  },
    function(err, student_instance){
      if (err){
        next(err)
      }else {
        return res.status(200)
      }
  })
});

router.get('/getstudentinfo/:id', function(req, res){
  Student.findById(req.params.id, 'Classes', function(err, student_instance){
    if (err) return handleError(err);
    let ClassArray = [];
    let classPromises = [];
    for (let classId of student_instance.Classes){
      classPromises.push(new Promise(function(resolve, reject){
        return Classroom.findById(classId)
        .then(classroom_instance=>{
          ClassArray.push({
            id: classroom_instance.id,
            ClassCode: classroom_instance.ClassCode,
          })

          //PRINTS AFTER RESPONSE IS SENT
          resolve("Completed")
        })
        .catch(err =>{
          console.log('There was an error')
        })
      }))
    }
    Promise.all(classPromises)
    .then(function(value){
      res.send({
        student_info: student_instance,
        class_info: ClassArray
      })
    })
    .catch(err =>{
      console.log(err)
    })
  })
})


// instructor routes
router.get('/getinstructor/:id', function(req, res){
  console.log('gogogoogogo')
  Instructor.findById(req.params.id, 'Classes', function(err, instructor_instance){
    if (err) return handleError(err);
    let ClassArray = [];
    let classPromises = [];
    for (let classId of instructor_instance.Classes){
      classPromises.push(new Promise(function(resolve, reject){
        return Classroom.findById(classId)
        .then(classroom_instance=>{
          if(classroom_instance !== null){
            ClassArray.push({
              id: classroom_instance.id,
              name: classroom_instance.Name,
              students: classroom_instance.Students
            })
            //PRINTS AFTER RESPONSE IS SENT
            resolve("Completed")
          }else{
            Instructor.update( {_id: instructor_instance.id}, { $pull: {Classes: [classId] } } )
            resolve("not added");
          }
        })
        .catch(err =>{
          console.log('There was an error')
        })
      }))
    }
    Promise.all(classPromises)
    .then(function(value){
      res.send({
        instructor_info: instructor_instance,
        class_info: ClassArray
      })
    })
    .catch(err =>{
      console.log('There was an error')
    })
  })
})

router.post('/startattendance', function(req, res) {
  Classroom.findByIdAndUpdate(req.body.class_id, { ClassCode: req.body.code})
  res.statusText = "The action was completed";
  return res.status(200).send('attendance has started')
})

// classroom routes
router.post('/createclassroom', function(req, res, next) {
  console.log(req.body)
  let InstructorInstance;
  Instructor.findOne({ Email: req.body.email}, function(err, response){
    if (err) next (err)
    InstructorInstance = response;
    console.log(response)
    Classroom.create({ 
      Name: req.body.name, 
      Instructor: InstructorInstance.id,
    }, function(err, classroom_instance){
        // if (err) return handleError(err);
        if (err){
          next(err)
        }else {
          Instructor.findByIdAndUpdate(InstructorInstance.id, { $push: {Classes: classroom_instance.id}}, function(err, instructor_instance){
            if (err) next(err);
          })
          res.status(200)
          res.send({id: classroom_instance.id})
        }
    })
  })
});

router.get('/getclassinfo/:id', function(req, res){
  Classroom.findById(req.params.id, "Name Students", function(err, classroom_instance){
    if (err) return handleError(err);
    let StudentArray = [];
    let studentPromises = [];
    for (let studentId of classroom_instance.Students){
      studentPromises.push(new Promise(function(resolve, reject){
        return Student.findById(studentId)
        .then(student_instance=>{
          StudentArray.push({
            FullName: student_instance.FullName,
            DaysPresent: student_instance.DaysPresent,
            DaysLate: student_instance.DaysLate,
            DaysUnexcusedAbsences: student_instance.DaysUnexcusedAbsences,
            DaysExcusedAbsences: student_instance.DaysExcusedAbsences,
          })
          //PRINTS AFTER RESPONSE IS SENT
          resolve("Completed")
        })
        .catch(err =>{
          console.log('There was an error')
        })
      }))
    }
    Promise.all(studentPromises)
    .then(function(value){
      res.send({
        student_info: StudentArray,
        class_info: classroom_instance
      });
    })
    .catch(err =>{
      console.log(err)
    })
  })
})

router.delete('/deleteclass/:id', function(req, res){
  Classroom.findByIdAndRemove(req.params.id, function(err, response){
    if(err) res.json({message: "Error in deleting record id " + req.params.id});
    else res.json({message: "Person with id " + req.params.id + " removed."});
 });
})

router.post('/updateclassname/:id', function(req, res, next) {
  Classroom.findByIdAndUpdate(req.params.id, { Name: req.body.name }, function(err, response){
    if(err) res.json({message: "Error in updating record id " + req.params.id});
    else res.json({message: "Class with id " + req.params.id + " updated."});
  })
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  Student.find(function(err, response){
    console.log(response)
  })
  Classroom.find(function(err, response){
    console.log(response)
  })
  Instructor.findOne(function(err, response){
    console.log(response)
  })

  // Student.remove(function(err, response){
  //   console.log(response)
  // })
  // Classroom.remove(function(err, response){
  //   console.log(response)
  // })
  // Instructor.remove(function(err, response){
  //   console.log(response)
  // })
  res.send('respond with a resource');
});

module.exports = router;
