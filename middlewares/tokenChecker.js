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
				var token = req.query.token

				if(t == "s"){
					res.writeHead(200, {"Content-Type": "text/html"}); 
   					res.end('<p><html><body><h1>User home page </h1><hr><form action= \"/api/v2/assignments/'+ s +'?token='+token+'\" method=\"GET\"><button>Visualizza gli assignment</button></form>'+
							'<form action= \"/api/v2/courseStudent/' + s + '?token='+token+'\" method=\"GET\"><button>Visualizza i corsi</button></form>'+
							'<form action= \"/api/v2/uploadAssignment/' + s + '?token='+token+'\" method=\"GET\"><button>Carica un assignment completato</button></form>'+
							'<form action= \"/api/v2/marks/' + s + '?token='+token+'\" method=\"GET\"><button>Visualizza i voti</button></form></body></html></p>');
					}
				if(t == "t"){
					res.writeHead(200, {"Content-Type": "text/html"}); 
					res.end('<p><html><body><h1>User home page </h1><hr><form action= \"/api/v2/assignments/'+ s +'?token='+token+'\" method=\"GET\"><button>Visualizza gli assignment</button></form>'+
						 '<form action= \"/api/v2/courses/' + s + '?token='+token+'\" method=\"GET\"><button>Visualizza i corsi</button></form>'+
						 '<form action= \"/api/v2/addAssignment?token='+token+'\" method=\"GET\"><button>Carica assignment</button></form>'+
						 '<form action= \"/api/v2/addMarks?token='+token+'\" method=\"GET\"><button>Carica voto</button></form>'+
						 '<form action= \"/api/v2/students?token='+token+'\" method=\"GET\"><button>Visualizza studenti</button></form>'+
						 '<form action= \"/api/v2/averageMarks?token='+token+'\" method=\"GET\"><button>Media voti assignment</button></form>'+
						 '<form action= \"/api/v2/marks/' + s + '?token='+token+'\" method=\"GET\"><button>Visualizza i voti</button></form></body></html></p>');
				}
				if(t == "a"){
					res.writeHead(200, {"Content-Type": "text/html"});
					res.end('<p><html><body><h1>Admin home page </h1><hr><form action= \"/api/v2/addStudent\" method=\"GET\"><button>Aggiungi Studente</button></form>' +
					'<form action= \"/api/v2/addTeacher\" method=\"GET\"><button>Aggiungi Teacher</button></form>' + 
					'<form action= \"/api/v2/addCourse\" method=\"GET\"><button>Aggiungi corso</button></form>' +
					'<form action= \"/api/v2/removeStudent\" method=\"GET\"><button>Rimuovi Studente</button></form> ' +
					'<form action= \"/api/v2/removeTeacher\" method=\"GET\"><button>Rimuovi Teacher</button></form>'+
					'<form action= \"/api/v2/removeCouses\" method=\"GET\"><button>Rimuovi Corso</button></form>' + 
					'<form action= \"/api/v2/teachers\" method=\"GET\"><button>Vedi tutti i teacher</button></form>'+
					'<form action= \"/api/v2/students\" method=\"GET\"><button>Vedi tutti gli studenti</button></form>'+
					'<form action= \"/api/v2/courses/admin" method=\"GET\"><button>Vedi tutti i corsi</button></form></body></html></p>')
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