const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser');
const morgan = require('morgan')
const mongoose = require('mongoose');

/*
//var http = require('http');

var server = http.createServer(function(req, res) { 
  res.writeHead(200, {"Content-Type": "text/html"}); 
  res.end('<p><html></head><body><h1>LOG-IN</h1><hr><form action= "/login" method="POST">Username: <input type = "text" name = "name"><br><br>Password: <input type = "text" name = "text"><br><br><form action=""><input type="radio" name="type" value="male" checked="true"> Student<br><input type="radio" name="type" value="female"> Teacher<br></form><button>Log-in</button><br></form></body></p>');
});

server.listen(PORT);*/


app.use(express.static('./public'))

const routerStudent = require('./routes/students.js')
const routerTeacher = require('./routes/teachers.js')
const routerAssignment = require('./routes/assignment.js')
const routerMarks = require('./routes/marks.js')
const routerCourses = require('./routes/courses.js')

//connessione al DB MongoD
mongoose.connect("mongodb://stefanopretto:hubusivi_2018@cluster0-shard-00-00-gmemg.mongodb.net:27017,cluster0-shard-00-01-gmemg.mongodb.net:27017,cluster0-shard-00-02-gmemg.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true", { useNewUrlParser: true });

//permette di vedere nel terminale la risposta in breve della pagina e vari errori
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//quello che fa nella pagina localhost:3000 -> Hello World!
app.get('/', (req, res) => res.send())
app.listen(PORT, () => console.log('Example app listening on port: ' + PORT))


//vari routers alle varie pagine 
app.use('/teachers',routerTeacher)
app.use('/courses',routerCourses)
app.use('/marks',routerMarks)
app.use('/students',routerStudent);
app.use('/assignment',routerAssignment)


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
    }*/

})