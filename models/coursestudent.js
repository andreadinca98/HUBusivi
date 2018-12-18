//Relation between courses and students
const mongoose = require('mongoose');

const courseStudentSchema = mongoose.Schema({
    courseId: { type: String, require: true },
	studentId: { type: String, require: true }
    
});

module.exports = mongoose.model('courseStudent', courseStudentSchema);