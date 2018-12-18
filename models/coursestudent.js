//Relation between mark student
const mongoose = require('mongoose');

const courseStudentSchema = mongoose.Schema({
    courseId: { type: String, require: true },
	studentId: { type: String, require: true }
    
});

module.exports = mongoose.model('markStudent', courseStudentSchema);