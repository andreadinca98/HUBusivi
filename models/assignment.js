//ASSIGNMENT
const mongoose = require('mongoose');

const assignmentSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	nome: { type:String, require: true},
	descrizione: { type:String, require: true},
	expireData: { type:String, require: true},
	uploadData: { type:String, require: true},
	couse_id: {type: String, require: true}
});

module.exports = mongoose.model('Assignment', assignmentSchema);

