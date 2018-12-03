const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser');
const morgan = require('morgan')
const mongoose = require('mongoose');
app.use(express.static('./public'))


//const User = require('./models/user')
//const routerUsers = require('./routes/users.js')

const Teacher = require('./models/teacher.js')
const routerStudent = require('./routes/students.js')
const routerTeacher = require('./routes/teacher.js')
const routerAssignment = require('./routes/assignment.js')
const routerExam = require('./routes/exam.js')
const routerMarks = require('./routes/marks.js')
const routerCourses = require('./routes/courses.js')

//connessione al DB MongoD
mongoose.connect("mongodb://stefanopretto:hubusivi_2018@cluster0-shard-00-00-gmemg.mongodb.net:27017,cluster0-shard-00-01-gmemg.mongodb.net:27017,cluster0-shard-00-02-gmemg.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true", { useNewUrlParser: true });

//permette di vedere nel terminale la risposta in breve della pagina e vari errori
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//quello che fa nella pagina localhost:3000 -> Hello World!
app.get('/',(req,res) => {
    window
})
app.get('/', (req, res) => window.location.href = "./public/login.html")
app.listen(PORT, () => console.log('Example app listening on port: ' + PORT))

//vari routers alle varie pagine 
//app.use(routerTeacher)
app.use(routerCourses)
app.use(routerMarks)
app.use(routerExam)
app.use(routerAssignment)
app.use('/students',routerStudent);

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