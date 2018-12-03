const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const Assignment = require('../models/assignment.js')

app.use(bodyParser.urlencoded({extended: false}))

//
router.get('/assignment', (req,res) =>{
    Assignment
    .findAll()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'Handling GET requests to /assignment',
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

    Assignment
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
    .findById(id)
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
    const id = req.params.assignmentId;
    Assignment
    .remove({_id: id})
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
	});
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