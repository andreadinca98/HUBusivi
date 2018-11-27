const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000



app.get('/', (req, res) => res.send('Hello World!'))

app.get("/")


app.listen(PORT, () => console.log('Wxample app listening on port' + PORT))