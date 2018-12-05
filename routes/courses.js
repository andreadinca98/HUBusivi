//Giulio
const express = require('express')
const coursesRouter = express.Router();
const mongoose = require('mongoose');
const Course = require('../models/course.js'); 

coursesRouter.get('/', function(req, res){
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

coursesRouter.post('/', function (req, res) {

	const newCourse = new Course({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		description : req.body.description,
		begin: req.body.begin,
		end: req.body.end,
		teacher_id: req.body.teacherId
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

coursesRouter.get('/:coursesId', function(req, res){
	const teacherid = req.params.teacherId;
	console.log('Getting courses')
    Course.find({t_id: teacherid})
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

//funzione update da testare
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
