const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description : { type:Number, require: true},
    begin: { type:Number, require: true},
    end: { type:Number, require: true},
    teacher_id: { type: Number, require: true}
})

module.exports = mongoose.model('Course', courseSchema);