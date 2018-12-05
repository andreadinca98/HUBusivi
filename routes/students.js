/*
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

*/


var uniqid = require('uniqid');

var usersTable = global.usersTable
if ( usersTable == null )
	usersTable = [];

class User {

	async save() {
		let matchingUserId = -1;

		if (this.id == undefined) {
			this.id = uniqid();
		}
		else {
			matchingUserId = usersTable.findIndex(e => e.id === this.id)
		}

		// if no matches
		if (matchingUserId == -1)
			usersTable.push(this);
		// if at least one match, replace the first one at index 0 with this
		else
			usersTable[matchingUserId] = this;
		
		return this;
	}

	async delete() {
		let matchingUserId = usersTable.findIndex(e => e.id === this.id)
		if(matchingUserId!=-1) {
			usersTable.splice(matchingUserId, 1);
			return true;
		}
		return false; 
	}

	static remove(criterias) {
		let matchingUserId = usersTable.findIndex(e => e.id === criterias.id)
		if(matchingUserId!=-1) {
			usersTable.splice(matchingUserId, 1);
			return true;
		}
		return false; 
	}

	static async find(criterias) {
		//to be implemented filters users by criterias e.g. {name:pippo, id:1234}
		let matchingUsers = usersTable.filter(u => {
			return criterias.name == undefined ? true : u.name === criterias.name
			&&     criterias.id == undefined ? true : u.id === criterias.id
		});
		return matchingUsers;
	}

	static async findOne(criterias) {
		let users = await this.find(criterias)
		let firstUser = users.length==0 ? null : users[0]
		return firstUser;
	}

	// this returns a Promise as much as an async function
	static findOrCreate(criterias) {
		return this.findOne(criterias)
		.then( (user) => {
			if (user)
				return user
			else {
				if (criterias.id == undefined) {
					criterias.id = uniqid();
				}
				usersTable.push(criterias);
				return criterias;
			}
		})
	}

};

module.exports = User;
