const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
const app = express()
//usato finchè non scegliamo cosa fare con il db
const mysql = require('mysql')

app.use(bodyParser.urlencoded({extended: false}))

//
router.get('/assignment', (req,res) =>{
    res.send("prova assignment")
})

router.post('/assignment_create', (req,res) =>{
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'admin',
        password: 'root',
        database: 'is2'
    })
    const assignmentId = req.params.assignmentId
    const today = new Date();
    const uploaddata = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate()
    const expiredata = req.body.data;
    const name = req.body.name;
    const text = req.body.text;

    const queryString = "INSERT INTO assignments(name, text, expire_date, upload_date) VALUES (?,?,?,?)"
    connection.query(queryString,[name,text,expiredata,uploaddata],(err, rows, fields) =>{
        if(err){
            console.log("Failed to query for users: " + err )
            res.sendStatus(500)
            return
        }
        res.send("inserimento corretto")
    })
})

/*router.post('/assignment', (req,res) =>{
    
})*/


module.exports = router