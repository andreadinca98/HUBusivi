//fede
const express = require('express')
const router = express.Router();

router.get("/teacher",(req,res) =>{
    res.send("prova teacher")
})



module.exports = router