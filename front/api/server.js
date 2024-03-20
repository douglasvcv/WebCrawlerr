import express from 'express'
import { MongoClient } from "mongodb";
import cors from 'cors'
const app = express()

app.use(cors())
app.use(express.json())


app.get('/api/item', (req, res)=>{
    
})

app.listen(3000, ()=>console.log("Servidor rodando na porta 3000"))
