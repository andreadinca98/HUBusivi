//Giulio
const express = require('express')
const coursesRouter = express.Router();
const mongoose = require('mongoose');
const Course = require('../models/course.js'); 


coursesRouter.get('/', function (req, res) {
	console.log('Getting courses')
	Course.find({}, function (err, foundCourses) {
		if (err) {
			console.log(err)
			res.status(500).send();
		}
		else {
			res.json(foundCourses)
		}
	})
})

//get tramite id
coursesRouter.get('/:coursesId', function (req, res) {
	console.log('Getting courses for id')
	Course.find({ $or: [{ s_id: req.params.coursesId }, { t_id: req.params.coursesId }] }, function (err, foundCourses) {
		if (err) {
			console.log(err)
			res.status(500).send();
		}
		else {
			res.json(foundCourses)
		}
	})
})

//get tramite id
coursesRouter.get('/:userId', function (req, res) {
    console.log('Getting courses for id')
    Course.find({ $or: [{ s_id: req.params.userId }, { t_id: req.params.userId }] }, function (err, foundCourses) {
        if (err) {
            console.log(err)
            res.status(500).send();
        }
        else {

            res.json(foundCourses)

        }
    })
})

coursesRouter.post('/', function (req, res) {

	const newCourse = new Course({
		name: req.body.name, 
		description : req.body.description,
		t_id: req.body.t_id,
		s_id: req.body.s_id
	});

	newCourse
		.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: 'Handling POST requests to /course',
				createCourse: result
			});
		})
		.catch(err => {
			res.status(500).json({
				message: "Corso non inserito",
				error: err
			});
		});
});

coursesRouter.delete('/:coursesId', (req,res,next) => {
	const courseid = req.params.coursesId;
	Course.deleteOne({_id: courseid})
	.exec()
	.then(result => {
		res.status(200).json(result);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			message: "Corso rimosso",
			error: err
		})
	});
	
});

coursesRouter.put('/:coursesId', function(req, res){  
	const courseid = req.params.coursesId;
	Course.findOne({_id: courseid}, function(err, foundCourse){
		if(err){
			console.log(err)
			res.status(500).send();
		}
		else{
			if(!foundCourse){
				res.status(404).send();
			}
			else{
				if(req.body.name){
					foundCourse.name = req.body.name;
				}
				if(req.body.description){
					foundCourse.description = req.body.description;
				}
				if(req.body.t_id){
					foundCourse.t_id = req.body.t_id;
				}
				if(req.body.s_id){
					foundCourse.s_id = req.body.s_id;
				}
				foundCourse.save(function(err, updatedCourse){
					if(err){
						console.log(err);
						res.status(500).send();
					}
					else{
						res.send(updatedCourse);
					}
				})
			}
		}
	})
});


module.exports = coursesRouter
