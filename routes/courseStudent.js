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
/*router.get('/:courseId', function (req, res) {
	console.log('Getting courses for id')
	coursestudent.find({courseId: req.params.courseId}, function (err, foundCourse){
		if (err) {
			console.log(err)
			res.status(500).send();
		}
		else {
			res.json(foundCourse);
		}
	})
})*/
router.get('/:studentid', function (req, res) {
    console.log('Getting courses for id')
    console.log(req.params.studentid)
	coursestudent.find({studentId: req.params.studentid}, function (err, foundCourse){
		if (err) {
			console.log(err)
			res.status(500).send();
		}
		else {
			res.json(foundCourse);
		}
	})
})
router.post('/', (req,res) =>{
	const cStudent = new coursestudent({
        studentId: req.body.studentId,
        courseId: req.body.courseId
    })
    cStudent
    .save()
    .then(result => {
        console.log(result)
        res.status(201).json({
            message: 'Handling POST requests to /assignment',
            createcStudent: result
        })
    })
    .catch(err => {
        res.status(500).json({
            message: "Assignment non aggiunto",
            error: err
        })
    })
})

module.exports = router