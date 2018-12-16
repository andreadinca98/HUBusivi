//ASSIGNMENT
const mongoose = require('mongoose');

const assignmentSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	text: { type:String, require: true },
	name: { type:String, require: true },
	expireData: { type:String},
	uploadData: { type:String, require: true },
	studentId: { type: String, require: true },
	courseId: { type: String, require: true },
	active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Assignment', assignmentSchema);