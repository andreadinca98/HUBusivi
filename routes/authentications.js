const express = require('express');
const jwt     = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config  = require('../config.js'); // get our config file
const Student = require('../models/student.js');
const Teacher = require('../models/teacher.js');
const url 	  = require('url')

const authenticationRouter = express.Router(); 

authenticationRouter.post('/', async function(req, res) {
	// find the user
	var user = null
	if(req.body.type == "student"){
		user = await Student.findOne( { name: req.body.name } )
	}
	if(req.body.type == "teacher"){
		user = await Teacher.findOne( { name: req.body.name } )
	}
	
	if (!user) {
		// user not found
		//res.json({ success: false, message: 'Authentication failed. User not found.' });
		res.writeHead(200, {"Content-Type": "text/html"}); 
		res.end('<p><html><body><h1>Autenticazione fallita. Utente non trovato!</h1><form action= \"/\" method=\"GET\"><button>Torna al login</button></form></body></html></p>');
	} else {

		// check if password matches
		if (user.password != req.body.password) {
			// wrong password
			//res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			res.writeHead(200, {"Content-Type": "text/html"}); 
			res.end('<p><html><body><h1>Autenticazione fallita. Password errata!</h1><form action= \"/\" method=\"GET\"><button>Torna al login</button></form></body></html></p>');
		} else {

			// if user is found and password is right
			// create a token
			var payload = {
				id: user.id,
				name: user.name
			}
			var options = {
				expiresIn: 86400 // expires in 24 hours
			}
			var token = jwt.sign(payload, config.superSecret, options);
			if(req.body.type == "student"){
				res.redirect(url.format({
					pathname: "/api/v2/checker",
					query : {
						"id" : user.id,
						"t" : "s",
						"token" : token
					}
				}))
			}
			if(req.body.type == "teacher"){
				res.redirect(url.format({
					pathname: "/api/v2/checker",
					query: {
						"id" : user.id,
						"t" : "t",
						"token" : token
					}
				}))	
			}
			
		}

	}

});

module.exports = authenticationRouter;