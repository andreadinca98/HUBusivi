const jwt = require('jsonwebtoken'); 
const config = require('../config'); 
const url = require('url')

const tokenChecker = function(req, res, next) {
	// check header or url parameters or post parameters for token
	var token = req.params.token || req.query.token || req.headers['x-access-token'];
	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, config.superSecret, function(err, decoded) {			
			if (err) {
				return res.status(403).send({
					success: false,
					message: 'Failed to authenticate token.'
				});		
			} else {
				// if everything is good, save to request for use in other routes
				req.user = decoded;
				var t = req.query.t
				var s = req.query.id
				if(t == "s"){
					res.redirect(url.format({
						pathname: "/api/v2/courses/"+s,
						body: {
							"token" : token
						}
					}))
				}
				if(t == "t"){
					res.redirect(url.format({
						pathname: "/api/v2/courses/"+s,
						body: {
							"token" : token
						}
					}))
				}				
			}
		});
	} else {
		// if there is no token
		// return an error
		return res.status(401).send({ 
			success: false, 
			message: 'No token provided.'
		});	
	}
}

module.exports = tokenChecker