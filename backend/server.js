const express = require('express')
const cors = require('cors')

//config
const app = express()
const port = 3000

//middleware
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('API working')
})

app.listen(port,()=>{console.log(`server running on http://localhost:${port}`);
})