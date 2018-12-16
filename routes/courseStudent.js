const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const coursestudent = require('../models/coursestudent.js')

app.use(bodyParser.urlencoded({extended: false}))

router.get('/', function(req, res){
	coursestudent
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
})

//funzione per ricevere solo i corsi disponibili dallo studente
router.get('/:studentId', function (req, res) {
	console.log('Getting courses for id')
	coursestudent.find({ $or: [{ s_id: req.params.userId }, { t_id: req.params.userId }] }, function (err, foundAssignments){
		if (err) {
			console.log(err)
			res.status(500).send();
		}
		else {
			res.json(foundAssignments)
		}
	})
})
/*
router.post('/', (req,res) =>{
    const today = new Date();
    const t = today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear()
    const assignment = new Assignment({
        studentId: 
        courseId: 
        assignmentId:
    })

    assignment
    .save()
    .then(result => {
        console.log(result)
        res.status(201).json({
            message: 'Handling POST requests to /assignment',
            createAssignment: result
        })
    })
    .catch(err => {
        res.status(500).json({
            message: "Assignment non aggiunto",
            error: err
        })
    })
})

//funzione che cambia active a falso se oggi è scaduto l'assigment
router.put('/', (req,res) =>{
    const today = new Date();
    const t = today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear();
    coursestudent.find({}, function(err, foundAssignments){
        if (err) {
			console.log(err)
			res.status(500).send();
        }
        else {
			for(var i = 0; i<foundAssignments.length; i++){
				if(!t.localeCompare(foundAssignments[i].expireData)){
                    foundAssignments[i].active = false;
                    foundAssignments[i].save();
                }
            }
            res.json(foundAssignments);            
		}
    })
})


router.delete('/:assignmentId', (req,res) =>{
    const assignmentId = req.params.assignmentId
	coursestudent.deleteOne({_id: assignmentId})
	.exec()
	.then(result => {
		res.status(200).json(result);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			message: "Assignment non rimosso",
			error: err
		})
	})
	
})*/

module.exports = router