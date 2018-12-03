const mongoose = require('mongoose');

const marksSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    mark: Number,
    id_student: Number,
    courseId: String
})

module.exports = mongoose.model('Marks', marksSchema);