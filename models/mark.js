const mongoose = require('mongoose');

const marksSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    voto: Number,
    id_student: Number,
    id_assignment: String
})

module.exports = mongoose.model('Marks', marksSchema);