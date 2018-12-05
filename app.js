const express = require('express')
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Student   = require('./models/student');


// setup express 
const app = express();

app.use(express.static('./public'));




var nick = Student.findOrCreate({
    name: 'nick', 
    password: 'nick'
  });

var authenticationRoutes = require('./routes/authentication.js');
app.use('/authentication', authenticationRoutes);

// api routes
var apiRoutes = require('./routes/apis.js');
app.use('/api/v1', apiRoutes);

//connessione al DB MongoD
mongoose.connect("mongodb://stefanopretto:hubusivi_2018@cluster0-shard-00-00-gmemg.mongodb.net:27017,cluster0-shard-00-01-gmemg.mongodb.net:27017,cluster0-shard-00-02-gmemg.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true", { useNewUrlParser: true });

//permette di vedere nel terminale la risposta in breve della pagina e vari errori
app.use(morgan('dev'));

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//quello che fa nella pagina localhost:3000 -> Hello World!
app.get('/', (req, res) => res.send("Hello World!"))
app.listen(PORT, () => console.log('Example app listening on port: ' + PORT))

//ERRORI: se non è stato fatto nulla di quello sopra allora darà un errore
app.use((req,res,next)=>{
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
})
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})
/*
//effettuare login
app.get('/checkLogin',function(req, res){
    const tipo = req.body.type.getValue
    const a = document.getElementsByName('type')
    console.log(a)
    const nome = req.body.name
    const pass = req.body.password
    /*if(tipo == 'student'){
        console.log('s')     
    }
    if(tipo == 'teacher'){
        console.log('t')
    }

})
*/