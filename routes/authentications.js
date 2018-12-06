const express = require('express');
const jwt     = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('../config.js'); // get our config file
const Student = require('../models/student.js');
const Teacher = require('../models/teacher.js');

const authenticationRouter = express.Router(); 

authenticationRouter.post('/', async function(req, res) {
	console.log("fads")
	// find the user
	var user
	if(req.body.type = "student"){
		user = await Student.findOne( { name: req.body.name } )
	}
	if(req.body.type = "teacher"){
		user = await Teacher.findOne( { name: req.body.name } )
	}
	
	if (!user) {
		// user not found
		res.json({ success: false, message: 'Authentication failed. User not found.' });
		
	} else {

		// check if password matches
		if (user.password != req.body.password) {
			// wrong password
			res.json({ success: false, message: 'Authentication failed. Wrong password.' });

		} else {

			// if user is found and password is right
			// create a token
			var payload = {
				id: user.id,
				name: user.name,
				admin: user.admin
			}
			var options = {
				expiresIn: 86400 // expires in 24 hours
			}
			var token = jwt.sign(payload, config.superSecret, options);
			if(req.body.type = "student"){
				token += "s";
			}
			if(req.body.type = "teacher"){
				token += "t";	
			}
			
			// signed in
			res.json({ success: true, message: 'Enjoy your token!', token: token });
		}

	}

});

module.exports = authenticationRouter;