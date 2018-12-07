//Stefano 
//prova a vedere come si fa il get che ritorna i corsi di INF ORG
const express = require('express');
const usersRoutes = express.Router(); 
const mongoose = require('mongoose');
const Marks = require('../models/mark.js'); 

//restituisce tuti gli studenti nel Database
usersRoutes.get('/', (req,res,next) => {
	Marks
	.find()
	.exec()
	.then(docs => {
		console.log(docs);
		res.status(200).json(docs);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			message: 'Handling GET requests to /marks',
			error: err
		});
	});
});

//Inserisci marks nel DB, andare in body di Postman 
//e aggiungere in linguaggio JSON
usersRoutes.post('/', function (req, res) {	

	const marks = new Marks({
        _id: new mongoose.Types.ObjectId(),
        mark:  req.body.mark,
        studentId:  req.body.studentId,
        assignmentId:  req.body.assignmentId				
	});
	
	//.save mette tutto nel DB
	marks
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
			message: "Voto non inserito",
			error: err
		});	
	});
});

//Restituisce gli marks con quelli ID
usersRoutes.get('/:marksId', (req,res,next) => {	
	const id = req.params.marksId;
	Marks.findById(id)
	.exec()
	.then(doc => {		
		console.log(doc),		
		res.status(200).json(doc)
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			message: "Non è stato trovato il voto",
			error: err
		});
	});
});

usersRoutes.get('/avg/:assignmentId', (req,res,next) => {	
	const id = req.params.assignmentId;
	Marks.find({assignmentId : id})
	.exec()
	.then(doc => {
		console.log(doc.length)
		console.log(doc.values.mark)
		var avg = 0
		var i = 0
		for(i = 0;i<doc.length;i++){
			avg += doc.mark
			
		}	
		avg = avg/i
		console.log(doc + " - " +avg ),		
		res.status(200).json(doc)
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			message: "Non è stato trovato il voto",
			error: err
		});
	});
});

//delete
usersRoutes.delete('/:marksId', (req,res,next) => {
	const id = req.params.marksId;
	Marks.remove({_id: id})
	.exec()
	.then(result => {
		res.status(200).json(result);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			message: "Marks rimosso",
			error: err
		})
	});
	
});

//Restituisce gli marks con quelli ID
usersRoutes.get('/:couseId', (req,res,next) => {	
	const couseId = req.params.couseId;
	Marks.findById(couseId)
	.exec()
	.then(doc => {		
		console.log(doc),		
		res.status(200).json(doc)
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			message: "Non è stato trovato il voto",
			error: err
		});
	});
});


module.exports = usersRoutes;
