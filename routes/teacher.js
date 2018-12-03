//fede
const express = require('express')
const Teacher = require('../models/teacher')
const teacherRoutes = express.Router();

teacherRoutes.get('/teacher', async function(req,res) {
    let teachers = await Teacher.find({});
    res.json(teachers);
})
//prova
teacherRoutes.post('/teacher', async function (req, res) {
	var teacher = new Teacher();
	teacher.name = req.body.name;
	teacher.password = req.body.password;
	teacher.admin = req.body.admin;

	// save the bear and check for errors
	saved = await teacher.save()
	res.json(saved)
})

teacherRoutes.get('teacher/:teacher_id', async function(req, res) {
	let teacher_id = req.params.user_id
	if ( teacher_id == 'me' )
		teacher_id = req.user.id
	let teacher = await Teacher.findOne( { id: teacher_id } );
	res.json(teacher);
})
teacherRoutes.delete('teacher/:teacher_id',function (req, res) {
	if( Teacher.remove({ id: req.params.teacher_id }) )
		res.json({ message: 'Successfully deleted' });
	else
		res.json({ message: 'invalid id' });
})
teacherRoutes.put('teacher/:teacher_id',  
    async function(req, res) {
	let teacher = await Teacher.findOrCreate( { id: req.params.teacher_id } );
	// update info
	teacher.name = req.body.name || teacher.name;
	teacher.password = req.body.password || teacher.password;
	teacher.admin = req.body.admin;
})

module.exports = teacherRoutes

