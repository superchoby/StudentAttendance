const mongoose = require('mongoose');
const mongodb = 'mongodb+srv://superchoby:1superchoby@cluster0-6hnd0.mongodb.net/test?retryWrites=true&w=majority';

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(mongodb, mongoOptions)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports.Schema = mongoose.Schema;



  
