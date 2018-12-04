const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    name: String,
    description : String,
<<<<<<< HEAD
    t_id: String,
=======
>>>>>>> 621da18d7df8e46ac77637f75c1252318a2669d7
    s_id: String
})

module.exports = mongoose.model('Course', courseSchema);