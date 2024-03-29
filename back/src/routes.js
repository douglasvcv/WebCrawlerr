import express from 'express'
import { executeWebCrawlerFindOperation } from './crud.js'
import 'dotenv/config'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())


app.get('/info', async (req, res) =>{
   const {city} = req.query
   console.log(req.query)
   try {
   const data = await executeWebCrawlerFindOperation(city)
   res.status(200).json(data)
   } catch (error) {
    res.status(400).json({message:"Ocorreu um erro: "+ error.message}) 
   }
    
})

app.listen(3000, ()=>console.log("Servidor aberto!") )