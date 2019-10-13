const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const Classroom = db.Classroom;
const Instructor = db.Instructor;
const Student = db.Student;
const saltRounds = 10;
const WebSocket = require("ws");
const app = require("../app");
const wss = new WebSocket.Server({ port: 40510 });
let wsDict = {};

// student routes
router.post("/createstudent", function(req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    if (err) res.status(500).send("Hash error!");
    Student.create({ Email: req.body.email, Password: hash }, function(
      err,
      student_instance
    ) {
      if (err)
        return next(
          createError(409, "A student with that email already exists")
        );
      studentCopy = { ...student_instance["_doc"] };
      delete studentCopy["Password"];
      delete studentCopy["__v"];
      res.send(studentCopy);
    });
  });
});

router.post("/getstudent", function(req, res, next) {
  Student.findOne({ Email: req.body.email }, function(err, student_instance) {
    if (typeof student_instance === "undefined") {
      return next(createError(404, "A student with that email doesn't exist"));
    }
    if (err) {
      return next(createError(500, "Something broke!"));
    }
    bcrypt.compare(req.body.password, student_instance.Password, function(
      err,
      isValid
    ) {
      if (err) return next(createError(500, "Something broke!"));
      if (isValid) {
        let ClassArray = [];
        let classPromises = [];
        for (let classId of student_instance.Classes) {
          classPromises.push(
            new Promise(function(resolve, reject) {
              return Classroom.findById(classId)
                .then(classroom_instance => {
                  ClassArray.push({
                    id: classroom_instance.id,
                    ClassCode: classroom_instance.ClassCode
                  });
                  //PRINTS AFTER RESPONSE IS SENT
                  resolve("Completed");
                })
                .catch(err => {
                  console.log("There was an error");
                });
            })
          );
        }
        Promise.all(classPromises)
          .then(function(value) {
            studentCopy = { ...student_instance["_doc"] };
            delete studentCopy["Password"];
            delete studentCopy["__v"];
            res.send({
              student_info: studentCopy,
              class_info: ClassArray
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        res.status(401).send("Wrong password");
      }
    });
  });
});

router.post("/addclass", function(req, res, next) {
  Classroom.findOne({ AddCode: req.body.addCode }, function(
    err,
    classroom_instance
  ) {
    if (err) {
      return next(createError(404, "That add code doesn't exist"));
    }
    Student.findOneAndUpdate(
      { Email: req.body.email },
      { $addToSet: { Classes: classroom_instance.id } },
      function(err, student_instance) {
        if (err || student_instance === null) {
          return next(createError(404, "Error Adding Class"));
        } else {
          classroom_instance.Students = [
            ...classroom_instance.Students,
            student_instance.id
          ];
          classroom_instance.save();
          return res.status(200).send(student_instance);
        }
      }
    );
  });
});

router.post("/bepresent", function(req, res, next) {
  Classroom.findByIdAndUpdate(
    req.body.classID,
    { $inc: { StudentsPresent: 1 } },
    { new: true },
    function(err, classroom_instance) {
      if (err) {
        return next(createError(500, "Error Logging Student"));
      }
      Student.findByIdAndUpdate(
        req.body.studentID,
        {
          $push: { DaysPresent: new Date() }
        },
        function(err, student_instance) {
          if (err) res.status(500).send("Error Making Student Present");
          wsDict[req.body.classID].send(JSON.stringify(student_instance));
          console.log(student_instance);
        }
      );

      wsDict[req.body.classID].send(classroom_instance.StudentsPresent);

      return res.status(200).send("Student Reported As Present");
    }
  );
});

// instructor routes

router.post("/createinstructor", function(req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    if (err) res.status(500).send("Hash error!");
    Instructor.create({ Email: req.body.email, Password: hash }, function(
      err,
      instructor_instance
    ) {
      if (err)
        return next(
          createError(409, "A instructor with that email already exists")
        );
      instructorCopy = { ...instructor_instance["_doc"] };
      delete instructorCopy["Password"];
      delete instructorCopy["__v"];
      res.send(instructorCopy);
    });
  });
});

router.post("/getinstructor", function(req, res, next) {
  Instructor.findOne({ Email: req.body.email }, function(
    err,
    instructor_instance
  ) {
    if (
      typeof instructor_instance === "undefined" ||
      instructor_instance === null
    ) {
      return next(
        createError(404, "An instructor with that email doesn't exist")
      );
    }
    if (err) {
      return next(createError(500, "Something broke!"));
    }
    bcrypt.compare(req.body.password, instructor_instance.Password, function(
      err,
      isValid
    ) {
      if (err) return res.status(500).send("Error validating password!");
      if (isValid) {
        let ClassArray = [];
        let classPromises = [];
        for (let classId of instructor_instance.Classes) {
          classPromises.push(
            new Promise(function(resolve, reject) {
              return Classroom.findById(classId)
                .then(classroom_instance => {
                  if (classroom_instance !== null) {
                    ClassArray.push({
                      id: classroom_instance.id,
                      name: classroom_instance.Name,
                      students: classroom_instance.Students
                    });
                    //PRINTS AFTER RESPONSE IS SENT
                    resolve("Completed");
                  } else {
                    /*
                         in the case that the class has been deleted,
                         remove the class's id from the instructors list of 
                         classes
                      */
                    Instructor.update(
                      { _id: instructor_instance.id },
                      { $pull: { Classes: [classId] } }
                    );
                    resolve("not added");
                  }
                })
                .catch(err => {
                  console.log("There was an error");
                });
            })
          );
        }
        Promise.all(classPromises)
          .then(function(value) {
            instructorCopy = { ...instructor_instance["_doc"] };
            delete instructorCopy["Password"];
            delete instructorCopy["__v"];
            res.send({
              instructor_info: instructorCopy,
              class_info: ClassArray
            });
          })
          .catch(err => {
            console.log("There was an error");
          });
      } else {
        res.status(401).send("Wrong password");
      }
    });
  });
});

router.put("/updateinstructortime/:id", function(req, res) {
  Instructor.findByIdAndUpdate(
    req.params.id,
    { AttendanceTime: req.body.time },
    function(err, instructor_instance) {
      if (err) res.status(500).send("Something broke!");
      else return res.status(200).send("time updated successfully");
    }
  );
});

router.post("/startattendance", function(req, res) {
  Classroom.findByIdAndUpdate(
    req.body.classID,
    { ClassCode: req.body.attendanceCode, StudentsPresent: 0 },
    function(err, classroom_instance) {
      if (err) {
        return next(createError(500, "Something broke"));
      }
      wss.on("connection", function(ws) {
        wsDict[classroom_instance.id] = ws;
        console.log("websocket connection open");
      });
      res.statusText = "The action was completed";
      return res.status(200).send("attendance has started");
    }
  );
});

router.get("/cancelattendance/:id", function(req, res) {
  Classroom.findByIdAndUpdate(req.params.id, { ClassCode: "" }, function(
    err,
    classroom_instance
  ) {
    if (err) {
      return next(createError(500, "Something broke"));
    }
    console.log(classroom_instance);
    res.statusText = "The action was completed";
    return res.status(200).send("attendance has been canceled");
  });
});

generateAddCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  const badWords4Letters = [
    "fuck",
    "shit",
    "nigg",
    "damn",
    "hell",
    "cunt",
    "twat",
    "slut"
  ];
  while (code === "") {
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    if (badWords4Letters.includes(code.toLowerCase())) {
      code = "";
    } else if (code.includes("ASS") || code.includes("CUM")) {
      code = "";
    } else {
      Classroom.find({ AddCode: code }, function(err, response) {
        if (err) {
          return next(createError(500, "Something broke"));
        }
        if (response.length == 0) {
          code = "";
        }
      });
    }
  }
  return code;
};

// classroom routes
router.post("/createclassroom", function(req, res, next) {
  let InstructorInstance;
  Instructor.findOne({ Email: req.body.email }, function(err, response) {
    if (err) next(err);
    InstructorInstance = response;
    let code = generateAddCode();
    Classroom.create(
      {
        Name: req.body.name,
        Instructor: InstructorInstance.id,
        AddCode: code
      },
      function(err, classroom_instance) {
        // if (err) return handleError(err);
        if (err) {
          next(err);
        } else {
          Instructor.findByIdAndUpdate(
            InstructorInstance.id,
            { $push: { Classes: classroom_instance.id } },
            function(err, instructor_instance) {
              if (err) next(err);
            }
          );
          res.status(200);
          res.send({ id: classroom_instance.id });
        }
      }
    );
  });
});

router.get("/getclass/:id", function(req, res) {
  Classroom.findById(req.params.id, "Name Students", function(
    err,
    classroom_instance
  ) {
    if (err) res.status(500).send("Something broke!");
    let StudentArray = [];
    let studentPromises = [];
    for (let studentId of classroom_instance.Students) {
      studentPromises.push(
        new Promise(function(resolve, reject) {
          return Student.findById(studentId)
            .then(student_instance => {
              StudentArray.push({
                FullName: student_instance.FullName,
                DaysPresent: student_instance.DaysPresent,
                DaysLate: student_instance.DaysLate,
                DaysUnexcusedAbsences: student_instance.DaysUnexcusedAbsences,
                DaysExcusedAbsences: student_instance.DaysExcusedAbsences,
                id: student_instance.id
              });
              //PRINTS AFTER RESPONSE IS SENT
              resolve("Completed");
            })
            .catch(err => {
              console.log("There was an error");
            });
        })
      );
    }
    Promise.all(studentPromises)
      .then(function(value) {
        console.log(StudentArray);
        res.send({
          student_info: StudentArray,
          class_info: classroom_instance
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
});

router.delete("/deleteclass/:id", function(req, res) {
  Classroom.findByIdAndRemove(req.params.id, function(err, response) {
    if (err)
      res.json({ message: "Error in deleting record id " + req.params.id });
    else res.json({ message: "Person with id " + req.params.id + " removed." });
  });
});

router.post("/updateclassname/:id", function(req, res, next) {
  Classroom.findByIdAndUpdate(req.params.id, { Name: req.body.name }, function(
    err,
    response
  ) {
    if (err)
      res.json({ message: "Error in updating record id " + req.params.id });
    else res.json({ message: "Class with id " + req.params.id + " updated." });
  });
});

/* GET users listing. */
router.get("/", function(req, res, next) {
  Student.find(function(err, response) {
    console.log(response);
  });
  Classroom.find(function(err, response) {
    console.log(response);
  });
  Instructor.find(function(err, response) {
    console.log(response);
  });

  // Student.find(function(err, response) {
  //   console.log(response);
  // });
  // Classroom.findByIdAndUpdate(
  //   "5d9e785e776a0e0902ce864e",
  //   { Students: ["5d9e784b776a0e0902ce864d"] },
  //   function(err, response) {
  //     console.log(response);
  //   }
  // );
  // Instructor.find(function(err, response) {
  //   console.log(response);
  // });

  // Student.remove(function(err, response) {
  //   console.log(response);
  // });
  // Classroom.remove(function(err, response) {
  //   console.log(response);
  // });
  // Instructor.remove(function(err, response) {
  //   console.log(response);
  // });
  res.send("respond with a resource");
});

module.exports = router;
