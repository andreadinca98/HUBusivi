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
			message: 'Handling GET requests to /student',
			error: err
		});
	});
});

//Inserisci studente nel DB, andare in body di Postman 
//e aggiungere in linguaggio JSON email,nome e cognome
usersRoutes.post('/', function (req, res) {	

	const student = new Student({
		_id : new mongoose.Types.ObjectId(),
		name : req.body.name				
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
			message: "Studente rimosso",
			error: err
		})
	});
	
});

module.exports = usersRoutes;


/* 
const express = require('express');
const User   = require('../models/student.js');
const usersRoutes = express.Router(); 

usersRoutes.get('/user', async function(req, res) {	
	let users = await User.find({});
	res.json(users);
})

usersRoutes.post('/user', async function (req, res) {
	var user = new User();
	user.name = req.body.name;
	user.password = req.body.password;
	user.admin = req.body.admin;

	// save the bear and check for errors
	saved = await user.save()
	res.json(saved)
})

usersRoutes.get('/user/:id ', async function(req, res) {
	console.log("Lala" + req.param.id)
	/*
	let user_id = req.params.user_id
	if ( user_id == 'me' )
		user_id = req.user.id
	let user = await User.findOne( { id: user_id } );
	res.json(user);
})

usersRoutes.delete('/user/:user_id',function (req, res) {
	if( User.remove({ id: req.params.user_id }) )
		res.json({ message: 'Successfully deleted' });
	else
		res.json({ message: 'invalid id' });
})
usersRoutes.put('/user/:user_id',  
    async function(req, res) {
	let user = await User.findOrCreate( { id: req.params.user_id } );
	// update info
	user.name = req.body.name || user.name;
	user.password = req.body.password || user.password;
	user.admin = req.body.admin;
})


module.exports = usersRoutes; */
