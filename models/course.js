const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    name: String,
    studentId: String,
    teacherId: String
})

module.exports = mongoose.model('Course', courseSchema);