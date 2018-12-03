//STUDENT
const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email: { type:String, require: true},
});

module.exports = mongoose.model('Student', studentSchema);

 