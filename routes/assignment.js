const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const Assignment = require('../models/assignment.js')

app.use(bodyParser.urlencoded({extended: false}))

router.get('/', function(req, res){
	console.log('Getting assignments')
    Assignment.find()
    .exec(function(err, courses){
        if(err){
            res.end('Error has occured')
        }
        else{
            console.log('List of courses')
            res.json(courses)
			}
		})
})

//funzione per ricevere solo i corsi disponibili dallo studente
router.get('/:studentId', function (req, res) {
	console.log('Getting courses for id')
	Assignment.find({ $and: [{ studentId: req.params.studentId }, { active: true }] }, function (err, foundAssignments) {
		if (err) {
			console.log(err)
			res.status(500).send();
		}
		else {
            console.log(req.query.token)
			res.json(foundAssignments)
		}
	})
})

router.post('/', (req,res) =>{
    const today = new Date();
    const t = today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear()
    const assignment = new Assignment({
        _id: new mongoose.Types.ObjectId(),
        text: req.body.text,
        name: req.body.name,
        expireData: req.body.expireData,
        uploadData: t,
        studentId: req.headers.studentId,
        courseId: req.body.courseId,
        complete: req.body.complete
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
    Assignment.find({}, function(err, foundAssignments){
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
	Assignment.deleteOne({_id: assignmentId})
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
	
})

module.exports = router