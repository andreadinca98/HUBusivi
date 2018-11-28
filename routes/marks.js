const express = require('express')
const router = express.Router();

//
router.get('/marks', (req,res) =>{
    res.send("prova marks")
})



module.exports = router