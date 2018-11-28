const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const morgan = require('morgan')
const User   = require('./models/user')

const routerUsers = require('./routes/users.js')
const routerTeacher = require('./routes/teacher.js')
const routerAssignment = require('./routes/assignment.js')
const routerExam = require('./routes/exam.js')
const routerMarks = require('./routes/marks.js')
const routerCourses = require('./routes/courses.js')

//permette di vedere nel terminale la risposta in breve della pagina e vari errori
app.use(morgan('short'))

//inserimento nome in una classe User
var nick = User.findOrCreate({
    name: 'nick', 
    password: 'nick',
    admin: true 
  });
 
//vari routers alle varie pagine  
app.use(routerMarks)
app.use(routerExam)
app.use(routerAssignment)
app.use(routerUsers)
app.use(routerTeacher)
app.use(routerCourses)

//quello che fa nella pagina localhost:3000 -> Hello World!
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(PORT, () => console.log('Wxample app listening on port' + PORT))

//ERRORI: se non è stato fatto nulla di quello sopra allora darà un errore
app.use((req,res,next)=>{
    const error = new Error('Page not found')
    error.status = 404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

/*
Lasciamolo da parte mongoose per ora, proviamo a fare senza DB come avevamo deciso
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://ad98:'+process.env.MONGO_ATLAS_PW+'@cluster0-shard-00-00-',{
        useMongoClient: true
    })
*/