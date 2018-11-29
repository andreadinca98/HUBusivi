const express = require('express')
const router = express.Router();


//
router.get('/assignment', (req,res) =>{
    res.send("prova assignment")
})

<<<<<<< HEAD

/*router.post('/assignment', (req,res) =>{
    const assignmentId = req.params.assignmentId
    const queryString = "INSERT INTO assignments(name, text) VALUES (?,?)"
    const today = new Date();
    const data = today.ge
})*/


=======
>>>>>>> f0bb919df175c5b9486b00fa3dcbdcc127fcfa62
module.exports = router