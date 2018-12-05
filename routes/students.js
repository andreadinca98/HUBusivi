const express = require('express');
const usersRoutes = express.Router(); 
const mongoose = require('mongoose');
const Student = require('../models/student.js'); 

//restituisce tuti gli studenti nel Database
usersRoutes.get('/', (req,res,next) => {
	Student
	.find()
	.exec()
	.then(docs => {
		console.log(docs);
		res.status(200).json(docs);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			message: 'Errore in /students GET',
			error: err
		});
	});
});

//Inserisci studente nel DB, andare in body di Postman 
//e aggiungere in linguaggio JSON email,nome e cognome
usersRoutes.post('/', function (req, res) {	

	const student = new Student({
		_id : new mongoose.Types.ObjectId(),
		name: req.body.name,
		cognome : req.body.cognome,
		email : req.body.email
	});
	
	//.save mette tutto nel DB
	student
	.save()
	.then(result => {			
		console.log(result);
		res.status(201).json({
			message: 'Handling POST requests to /student',
			createStudent: result
		});
	})
	.catch(err => {
		res.status(500).json({
			message: "Studente non inserito",
			error: err
		});	
	});
});

//Restituisce gli studenti con quelli ID
usersRoutes.get('/:studentsId', (req,res,next) => {	
	const id = req.params.studentsId;
	Student.findById(id)
	.exec()
	.then(doc => {		
		console.log(doc),		
		res.status(200).json(doc)
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			message: "Non è stato trovato lo studente",
			error: err
		});
	});
});

//Restituisce gli studenti con quelli ID
usersRoutes.get('/:corso', (req,res,next) => {	
	const corso_nome = req.params.corso_nome;
	Student.array.forEach(element => {
		console.log(element)
	});
});

//delete
usersRoutes.delete('/:studentsId', (req,res,next) => {
	const id = req.params.studentsId;
	Student.remove({_id: id})
	.exec()
	.then(result => {
		res.status(200).json(result);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			message: "Studente non rimosso errore!!!",
			error: err
		})
	});
	
});

module.exports = usersRoutes;
