const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    name: String,
    description : String,
    t_id: String,
    s_id: String
})

module.exports = mongoose.model('Course', courseSchema);