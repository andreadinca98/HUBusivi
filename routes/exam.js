//Ilaria
const express = require('express')
const Exam = require('../models/exam')
const examRouter = express.Router();

//
examRouter.get('/exam', (req,res) =>{
    res.send("prova exam")
})

examRouter.post('/exam', async function (req, res) {
	var exam = new Exam();
	exam.name = req.body.name;

	// save the bear and check for errors
	saved = await exam.save()
	res.json(saved)
})
//parametri: name, examId

//POST adds a exam on the database

//DELETE removes an exam

//PUT updates an exam


module.exports = examRouter
