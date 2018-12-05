const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const Assignment = require('../models/assignment.js')

app.use(bodyParser.urlencoded({extended: false}))

router.get('/assignment', function(req, res){
	console.log('Getting assignments')
    Assignment.find()
    .exec(function(err, courses){
        if(err){
            res.end('Error has occured')
        }
        else{
            console.log('List of courses')
            res.json(courses)
			}
		})
})

router.get('/assignment/:studentId', (req,res) =>{
    console.log('Getting assignment')
    const sId = req.params.studentId;
	    
    Assignment.findOne({studentid: sId})
    .exec(function(err, courses){
        if(err){
            res.end('Error has occured')
        }
        else{
            console.log('List of courses')
            res.json(courses)
			}
    })
    .then(result => {
		res.status(200).json(result);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			message: "Errore lista assignment",
			error: err
		})
	})
})

router.post('/assignment_create', (req,res) =>{
    const today = new Date();
    const assignment = new Assignment({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        text: req.body.text,
        expiredata: req.body.data,
        uploaddata:today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate()
    })

    assignment
    .save()
    .then(result => {
        console.log(result)
        res.status(201).json({
            message: 'Handling POST requests to /assignment',
            createAssignment: result
        })
    })
    .catch(err => {
        res.status(500).json({
            message: "Assignment non aggiunto",
            error: err
        })
    })
})

router.get('/:assignmentId',(req,res,next) =>{
    const id = req.params.assignmentId;
    Assignment
    .findOne({_id: id})
	.exec()
	.then(doc => {		
		console.log(doc),		
		res.status(200).json(doc)
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			message: "Non è stato trovato l'assignment",
			error: err
		});
	});

})


router.delete('/assignment/:assignmentId', (req,res) =>{
    const assignmentId = req.params.assignmentId
	Assignment.deleteOne({_id: assignmentId})
	.exec()
	.then(result => {
		res.status(200).json(result);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			message: "Assignment non rimosso",
			error: err
		})
	})
	
})

/*router.update('/assignment/:assignmentId', (req,res) =>{
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'admin',
        password: 'root',
        database: 'is2'
    })
    var tipo = 4
    const queryString = "SELECT * FROM users WHERE matricola = ?"
    connection.query(queryString,[matricola],(err, rows, fields) =>{
        if(err){
            console.log("Failed to query for users: " + err )
            res.sendStatus(500)
            return
        }
        tipo = res.rows()
    })
    if(tipo = 0){    
        const assignmentId = req.params.assignmentId
        const expiredata = req.body.data;
        const name = req.body.name;
        const text = req.body.text;

        queryString = "UPDATE assignments(name, text, expire_date, upload_date) VALUES (?,?,?,?) WHERE assignmentid = ?"
        connection.query(queryString,[assignmentId],(err, rows, fields) =>{
            if(err){
                console.log("Failed to query for users: " + err )
                res.sendStatus(500)
                return
            }
            res.send("inserimento corretto")
        })
    }
})*/

module.exports = router