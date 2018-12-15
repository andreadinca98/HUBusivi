const express = require('express');
const jwt     = require('jsonwebtoken'); // used to create, sign, and verify tokens
const url = require('url')


var apiRoutes = express.Router();

// ---------------------------------------------------------
// route middleware to check authentication token
// ---------------------------------------------------------
var tokenChecker = require('../middlewares/tokenChecker');
apiRoutes.use(tokenChecker);

// ---------------------------------------------------------
// protected routes
// ---------------------------------------------------------
apiRoutes.get('/check', function(req, res) {
	res.json(req.decoded);
});


apiRoutes.get('/', function(req,res) {
	res.redirect(url.format({
		pathname: "/checker",
		query: {
			"id" : req.query.id,
			"t" : "s",
			"token" : req.query.token
		}
	}))
	apiRoutes.use(tokenChecker)
	if(req.body.t == "s")
		console.log("s")
	if(req.body.t == "t")
		console.log("t")
})


module.exports = apiRoutes;