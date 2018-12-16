const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
//const coursestudent = require('../models/coursestudent.js')

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

module.exports = router