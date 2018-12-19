//ASSIGNMENT
const mongoose = require('mongoose');

const assignmentSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name:{ type:String, require: true },
	text: { type:String, require: true },
	expireData: { type:String},
	uploadData: { type:String, require: true },
	studentId: { type: String},
	teacherId: { type: String},
	courseId: { type: String, require: true },
	active: { type: Boolean, default: true },
	complete: {type: Boolean, require: true}
});

module.exports = mongoose.model('Assignment', assignmentSchema);