const express = require('express');
const adminsRoutes = express.Router(); 
const mongoose = require('mongoose');
const Admin = require('../models/admin.js'); 

//Inserisci studente nel DB, andare in body di Postman 
//e aggiungere in linguaggio JSON email,nome e cognome
adminsRoutes.post('/', function (req, res) {	
	const admin = new Admin({
		_id : new mongoose.Types.ObjectId(),
		name: req.body.name,
		password: req.body.password	
	});
	
	//.save mette tutto nel DB
	admin
	.save()
	.then(result => {			
		console.log(result);
		res.status(201).json({
			message: 'Handling POST requests to /admin',
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
adminsRoutes.get('/:studentsId', (req,res,next) => {	
	const id = req.params.studentsId;
	Admin.findById(id)
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
adminsRoutes.get('/:corso', (req,res,next) => {	
	const corso_nome = req.params.corso_nome;
	Admin.array.forEach(element => {
		console.log(element)
	});
});

//delete
adminsRoutes.delete('/:studentsId', (req,res,next) => {
	const id = req.params.studentsId;
	Admin.remove({_id: id})
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

module.exports = adminsRoutes;
