// api routes
const express = require('express');


var apiRoutes = express.Router();

const routerStudent = require('./students.js')
apiRoutes.use('/students',routerStudent);

const routerTeacher = require('./teachers.js')
apiRoutes.use('/teachers',routerTeacher)

const routerAssignment = require('./assignment.js')
apiRoutes.use('/assignment',routerAssignment)

const routerMarks = require('./marks.js')
apiRoutes.use('/marks',routerMarks)

const routerCourses = require('./courses.js')
apiRoutes.use('/courses',routerCourses)

module.exports = apiRoutes;