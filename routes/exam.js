//Ilaria
const express = require('express')
const router = express.Router();

//
router.get('/exam', (req,res) =>{
    res.send("prova exam")
})



module.exports = router
