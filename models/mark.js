const mongoose = require('mongoose');

const marksSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    mark: Number,
    studentId: String,
    assignmentId: String
})

module.exports = mongoose.model('Marks', marksSchema);