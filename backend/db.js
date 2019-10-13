const mongoose = require("mongoose");
const mongodb =
  "mongodb+srv://superchoby:1superchoby@cluster0-6hnd0.mongodb.net/test?retryWrites=true&w=majority";

const Schema = mongoose.Schema;

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(mongodb, mongoOptions);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const ClassroomSchema = new Schema({
  Name: String,
  Students: [String],
  Instructor: { type: String, required: true },
  ClassCode: String,
  AddCode: { type: String, uppercase: true, required: true, unique: true },
  StudentsPresent: Number
});

const InstructorSchema = new Schema({
  Classes: [String],
  Email: { type: String, lowecase: true, required: true, unique: true },
  Password: String,
  Prefix: String,
  AttendanceTime: { type: Number, default: 600 }
});

const StudentSchema = new Schema({
  StudentId: Number,
  FullName: String,
  DaysPresent: [{ type: Date }],
  DaysLate: [{ type: Date }],
  DaysUnexcusedAbsences: [{ type: Date }],
  DaysExcusedAbsences: [{ type: Date }],
  Classes: [String],
  AttendanceCode: String,
  Email: { type: String, lowecase: true, required: true, unique: true },
  Password: String
});

const Classroom = mongoose.model("Classroom", ClassroomSchema);
const Instructor = mongoose.model("Instructor", InstructorSchema);
const Student = mongoose.model("Student", StudentSchema);

module.exports.Classroom = Classroom;
module.exports.Instructor = Instructor;
module.exports.Student = Student;
