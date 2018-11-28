//Giulio
const express = require('express')
const router = express.Router();

//
router.get('/courses', (req,res) =>{
    res.send("prova courses")
})



module.exports = router
