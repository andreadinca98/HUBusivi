//TEACHER
/*
const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: { type:String, require: true},
	cognome: { type:String, require: true},
	email: { type:String, require: true}
})

module.exports = mongoose.model('Teacher', teacherSchema);
*/
const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: { type:String, require: true},
	cognome: { type:String, require: true},
	email: { type:String, require: true}
});

module.exports = mongoose.model('Teacher', teacherSchema);
