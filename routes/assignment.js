const express = require('express')
const router = express.Router();

//
router.get('/assignment', (req,res) =>{
    res.send("prova assignment")
})



module.exports = router