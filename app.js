const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose');

mongoose.connect('mongodb://ad98:'+process.env.MONGO_ATLAS_PW+'@cluster0-shard-00-00-',{
    useMongoClient: true
})


const routerUser = require('./routes/users.js');
app.use(routerUser)

const routerTeacher = require('./routes/teacher.js')
app.use(routerTeacher)

const routerAssignment = require('./routes/assignment.js')
app.use(routerAssignment)

const routerExam = require('./routes/exam.js')
app.use(routerExam)

const routerMarks = require('./routes/marks.js')
app.use(routerMarks)

const routerCourses = require('./routes/courses.js')
app.use(routerCourses)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(PORT, () => console.log('Wxample app listening on port' + PORT))