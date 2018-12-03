//fede
const express = require('express')
const Teacher = require('../models/teacher')
const mongoose = require('mongoose');
const teacherRoutes = express.Router();

teacherRoutes.get('/', (req,res,next) =>{
	Teacher
	.find()
	.exec()
	.then(docs => {
		console.log(docs);
		res.status(200).json(docs);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			message: 'Handling GET requests to /teacher',
			error: err
		});
	});
});
//Inserisci studente nel DB, andare in body di Postman 
//e aggiungere in linguaggio JSON email,nome e cognome
teacherRoutes.post('/', function (req, res) ({
	const teacher = new Teacher({
		_id : new mongoose.Types.ObjectId(),
		name : req.body.name
});

//.save mette tutto nel DB
teacher
.save()
.then(result => {			
	console.log(result);
	res.status(201).json({
		message: 'Handling POST requests to /teacher',
		createTeacher: result
	});
})
.catch(err => {
	res.status(500).json({
		message: "Docente non inserito",
		error: err
	});	
});
});

//Restituisce gli studenti con quelli ID
usersRoutes.get('/:teachersId', (req,res,next) => {	
const id = req.params.teachersId;
Teacher.findById(id)
.exec()
.then(doc => {		
	console.log(doc),		
	res.status(200).json(doc)
})
.catch(err => {
	console.log(err);
	res.status(500).json({
		message: "Non è stato trovato il docente",
		error: err
	});
});

});

//delete
usersRoutes.delete('/:teachersId', (req,res,next) => {
const id = req.params.studentsId;
Teacher.remove({_id: id})
.exec()
.then(result => {
	res.status(200).json(result);
})
.catch(err => {
	console.log(err);
	res.status(500).json({
		message: "Docente rimosso",
		error: err
	})
});

});

module.exports = teachersRoutes

