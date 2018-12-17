const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser');
const morgan = require('morgan')
const mongoose = require('mongoose');
const path = require('path')

app.use(express.static('./public'))

const routerStudent = require('./routes/students.js')
const routerTeacher = require('./routes/teachers.js')
const routerAssignment = require('./routes/assignment.js')
const routerMarks = require('./routes/marks.js')
const routercouseStudent = require('./routes/courseStudent.js')
const routerCourses = require('./routes/courses.js')
const routerAuthentication = require('./routes/authentications.js');
const routerApis = require('./routes/apis.js');
const routerCheck = require('./middlewares/tokenChecker')

app.set('base', '/api/v2')
//connessione al DB MongoD
mongoose.connect("mongodb://stefanopretto:hubusivi_2018@cluster0-shard-00-00-gmemg.mongodb.net:27017,cluster0-shard-00-01-gmemg.mongodb.net:27017,cluster0-shard-00-02-gmemg.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true", { useNewUrlParser: true });

//permette di vedere nel terminale la risposta in breve della pagina e vari errori
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//quello che fa nella pagina localhost:3000 -> Hello World!

//vari routers alle varie pagine 
app.use('/api/v2/teachers',routerTeacher)
app.use('/api/v2/courses', routerCourses)
app.use('/api/v2/marks',routerMarks)
app.use('/api/v2/students',routerStudent);
app.use('/api/v2/authentications', routerAuthentication)
app.use('/api/v2/assignments', routerAssignment)
app.use('/api/v2/apis', routerApis)
app.use('/api/v2/checker', routerCheck)
app.use('/api/v2/courseStudent', routercouseStudent)

app.get('/', (req, res) => {
    //res.writeHead(200, {"Content-Type": "text/html"}); 
    //res.end('<p><html><body><h1>LOG-IN</h1><hr><form action= \"/api/v2/authentications\" method=\"POST\">Username: <input type = \"text\" name = \"name\"><br><br>Password: <input type = \"password\" name = \"password\"><br><br><input type=\"radio\" name=\"type\" value=\"student\" checked=\"true\"> Student<br><input type=\"radio\" name=\"type\" value=\"teacher\"> Teacher<br><button>Log-in</button><br></form></body></html></p>');
    res.sendFile(path.join(__dirname + '/public/login.html'))
})
app.listen(PORT, () => console.log('Example app listening on port: ' + PORT))

app.get('/api/v2/addAssignment', (req, res) => {
    //res.writeHead(200, {"Content-Type": "text/html"}); 
    res.sendFile(path.join(__dirname + '/public/addAssignment.html'))
})
app.get('/api/v2/addMarks', (req, res) => {
    //res.writeHead(200, {"Content-Type": "text/html"}); 
    res.sendFile(path.join(__dirname + '/public/addMarks.html'))
})
app.get('/api/v2/uploadAssignment/:studentId', (req, res) => {
    //res.writeHead(200, {"Content-Type": "text/html"}); 
    res.sendFile(path.join(__dirname + '/public/uploadAssignment.html'))
})
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
