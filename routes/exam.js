//Ilaria
const express = require('express')
const examRouter = express.Router();

//
router.get('/exam', (req,res) =>{
    res.send("prova exam")
})

//parametri: name, examId

//POST adds a exam on the database

//DELETE removes an exam

//PUT updates an exam


module.exports = examRouter
