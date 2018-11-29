//Federico
const express = require('express')
const router = express.Router();

router.get("/users",(req,res) =>{
    res.send("prova users")
})



module.exports = router
