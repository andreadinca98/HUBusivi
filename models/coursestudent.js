//Relation between mark student
const mongoose = require('mongoose');

const courseStudentSchema = mongoose.Schema({
	studentId: { type: String, require: true },
    courseId: { type: String, require: true },
    assignmentId: { type: String, require: true }
});

module.exports = mongoose.model('markStudent', courseStudentSchema);