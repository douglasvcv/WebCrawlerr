const express = require('express')
const app = express()
const cors = require('cors')
import { MongoClient } from 'mongodb'

app.use(cors())
app.use(express.json())

app.get('/api/item', (req, res)=>{
    
    
    try {
        
    } catch (error) {
        
    }
})

app.listen(3000, ()=>console.log("Servidor funcionando"))