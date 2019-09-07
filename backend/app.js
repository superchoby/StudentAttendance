'use strict'

const http = require('http');
const mongoose = require('mongoose');
const mongodb = 'mongodb+srv://superchoby:1superchoby@cluster0-6hnd0.mongodb.net/test?retryWrites=true&w=majority';

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(mongodb, mongoOptions)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const Schema = mongoose.Schema;

const ClassroomSchema = new Schema({
    Students: [String],
    Instructor: { type:String, required: true},
    ClassCode: String,
})

const InstructorSchema = new Schema({
    Classes: [String],
})

const StudentSchema = new Schema({
    StudentId: Number,
    FullName: String,
    DaysPresent: [{type: Date}],
    DaysLate: [{type: Date}],
    DaysUnexcusedAbsences: [{type: Date}],
    DaysExcusedAbsences: [{type: Date}],
    ClassesList: [String],
    AttendanceCode: String,
    ClassCurrentlyHoldingAttendance: String,
})

const Classroom = mongoose.model('Classroom', ClassroomSchema);
const Instructor = mongoose.model('Instructor', InstructorSchema);
const Student = mongoose.model('Student', StudentSchema);   

const server = http.createServer(function(request, response){
    console.log('yo')
    if(request.method === 'GET'){
        if(request.url === '/createuser'){
            console.log(Object.keys(response))
        }
    }

    if(request.method === 'POST'){
        // if(request.url === '/createteacher'){
        console.log(response)
        if(request.url.includes('/createteacher')){
            console.log(2)
            let body = ''
            request.on('data', function(data) {
                console.log(3)
                body += data
                console.log('Partial body: ' + body)
            })
            // console.log(request)
        }
    }
})

const port = 8080
const host = '127.0.0.1'
server.listen(port, host);