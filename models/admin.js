//STUDENT
const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
	_id: mongoose.Types.ObjectId,
	name: String,
	password: String
});

module.exports = mongoose.model('Admin', adminSchema);