const express = require('express')
const router = express.Router();


//
router.get('/assignment', (req,res) =>{
    res.send("prova assignment")
})


/*router.post('/assignment', (req,res) =>{
    const assignmentId = req.params.assignmentId
    const queryString = "INSERT INTO assignments(name, text) VALUES (?,?)"
    const today = new Date();
    const data = today.ge
})*/


module.exports = router