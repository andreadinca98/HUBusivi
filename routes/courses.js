//Giulio
const express = require('express')
const coursesRouter = express.Router();
const mongoose = require('mongoose');
const Course = require('../models/course.js'); 


coursesRouter.get('/courses', function(req, res){
	console.log('Getting courses')
    Course.find()
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


coursesRouter.post('/addcourse', function (req, res) {

	const newCourse = new Course({
		name: req.body.name, 
		description : req.body.description
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

coursesRouter.delete('/courses/:coursesId', (req,res,next) => {
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

//funzione update da testare
/*coursesRouter.post('/updatecourse/:courseId', function(req, res){
	const id = req.params.id;
	Course.findOne({_id: id}, function(err, foundCourse){
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
});*/


module.exports = coursesRouter
