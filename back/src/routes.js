import express, { response } from 'express'
import { MongoClient } from "mongodb";
import 'dotenv/config'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())


//Connect cluster
export const connectToCluster = async (uri) => {
    let mongoClient;
  
    try {
      mongoClient = new MongoClient(uri);
      console.log("Connecting to MongoDB Atlas cluster...");
      await mongoClient.connect();
      console.log("Successfully connected to MongoDB Atlas!");
  
      return mongoClient;
    } catch (error) {
      console.error("Connection to MongoDB Atlas failed!", error);
      process.exit();
    }
  };


  //CRUD
export const executeWebCrawlerFindOperation = async (city) => {
    const uri = process.env.DB_URI;
    let mongoClient;
  
    try {
      mongoClient = await connectToCluster(uri);
      const db = mongoClient.db("webcrawler");
      const collection = db.collection("weather");
  
    //    console.log('CREATE WeatherForecast')
    //    await createWebCrawlerDocument(collection)
  
      // console.log("UPDATE Forecast currentTemperature");
      // await updateForecastByName(collection, "Crato", {
      //   currentTemperature: "27.4",
      // });
  
      // console.log("DELETE WeatherForecast");
      // await deleteForecastByName(collection, "Crato");
  
      let data = await findForecastByName(collection,{name: city});
      

        return data
    } finally {
      await mongoClient.close();
    }
  };

  
  //Find data by name
  export async function findForecastByName(collection, {name}) {
    
    const response = await collection.find({"location.name": name }).toArray();
    console.log({response})
    return response
  }

app.get('/info', async (req, res) =>{
   const {city} = req.query
   console.log(req.query)
   console.log({city})
   try {
   const data = await executeWebCrawlerFindOperation(city)
   res.status(200).json(data)
   } catch (error) {
    res.status(400).json({message:"Ocorreu um erro: "+ error.message}) 
   }
    
})

app.listen(3000, ()=>console.log("Servidor aberto!") )