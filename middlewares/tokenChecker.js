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
				console.log('\n\n'+s+'\n\n')

				if(t == "s"){
					/*res.redirect(url.format({
						pathname: "/api/v2/courses/"+s,
						body: {
							"token" : token
						}
						res.sendFile(path.join(__dirname + '/public/addAssignment'))
					}))*/
					res.writeHead(200, {"Content-Type": "text/html"}); 
   					res.end('<p><html><body><h1>User home page </h1><hr><form action= \"/api/v2/assignments/'+ s +'\" method=\"GET\"><button>Visualizza gli assignment</button></form>'+
							'<form action= \"/api/v2/courses/' + s + '\" method=\"GET\"><button>Visualizza i corsi</button></form>'+
							'<form action= \"/api/v2/uploadAssignment/' + s + '\" method=\"GET\"><button>Carica un assignment completato</button></form>'+
							'<form action= \"/api/v2/marks/' + s + '\" method=\"GET\"><button>Visualizza i voti</button></form></body></html></p>');
					}
				if(t == "t"){
					/*res.redirect(url.format({
						pathname: "/api/v2/courses/"+s,
						body: {
							"token" : token
						}
					}))*/
					res.writeHead(200, {"Content-Type": "text/html"}); 
					res.end('<p><html><body><h1>User home page </h1><hr><form action= \"/api/v2/assignments/'+ s +'\" method=\"GET\"><button>Visualizza gli assignment</button></form>'+
						 '<form action= \"/api/v2/courses/' + s + '\" method=\"GET\"><button>Visualizza i corsi</button></form>'+
						 '<form action= \"/api/v2/addAssignment\" method=\"GET\"><button>Carica assignment</button></form>'+
						 '<form action= \"/api/v2/addMarks\" method=\"GET\"><button>Carica voto</button></form>'+
						 '<form action= \"/api/v2/courseStudent\" method=\"GET\"><button>Studenti-corsi</button></form>'+
						 '<form action= \"/api/v2/marks/' + s + '\" method=\"GET\"><button>Visualizza i voti</button></form></body></html></p>');
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