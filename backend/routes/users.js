const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = require('../db');
const Schema = db.Schema;
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000'
}

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

router.post('/createstudent', function(req, res, next) {
  Student.create({ 
    Email: req.body.email, 
    Password: req.body.password,
    StudentId: parseInt(req.body.id),
    FullName: req.body.first_name + ' ' + req.body.last_name,
  },
    function(err, student_instance){
      if (err) return handleError(err);
      console.log(student_instance)
      return student_instance
  })
  res.send('respond with a resource');
});

router.post('/createclassroom', function(req, res, next) {
  let InstructorInstance;
  Instructor.findOne({ Email: req.body.email}, function(err, response){
    if (err) return handleError(err)
    InstructorInstance = response;
    Classroom.create({ 
      Name: req.body.name, 
      Instructor: InstructorInstance.id,
    }, function(err, classroom_instance){
        if (err) return handleError(err);
        Instructor.findByIdAndUpdate(InstructorInstance.id, { $push: {Classes: classroom_instance.id}}, function(err, instructor_instance){
          if (err) handleError(err);
        })
        res.statusText = 'The classroom was created';
        return res.status(200).send('Classroom created')
    })
  })
});

router.post('/startattendance', function(req, res) {
  Classroom.findByIdAndUpdate(req.body.class_id, { ClassCode: req.body.code})
  res.statusText = "The action was completed";
  return res.status(200).send('attendance has started')
})

router.get('/getstudentinfo/:id', cors(corsOptions), function(req, res){
  Student.findById(req.params.id, 'Classes', function(err, student_instance){
    if (err) return handleError(err);
    let ClassArray = [];
    let classPromises = [];
    for (let classId of student_instance.Classes){
      // Classroom.findById(classId)
      // .then(classroom_instance=>{
      //   ClassArray.push({
      //     id: classroom_instance.id,
      //     ClassCode: classroom_instance.ClassCode,
      //   })
      // })
      // .catch(err =>{
      //   console.log('There was an error')
      // })
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
      console.log(ClassArray)
      res.send({
        student_info: student_instance,
        class_info: ClassArray
      })
    })
    .catch(err =>{
      console.log('There was an error')
    })
  })
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  Student.findOne(function(err, response){
    console.log(response)
  })
  Classroom.findOne(function(err, response){
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
