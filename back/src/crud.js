import { MongoClient } from "mongodb";
import axios from 'axios'

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

//OPERATIONS
//Find
export async function findForecastByName(collection, { name }) {
  const response = await collection.find({ "location.name": name }).toArray();
  console.log({ response });
  return response;
}

//Post
export async function createWebCrawlerDocument(collection, data) {
    const forecastDocument = {
    data    
    };
    if(forecastDocument.data.location.country == "Brazil"){
      await collection.insertOne(forecastDocument);
      
    }
  }

//Execute CRUD
export const executeWebCrawlerFindOperation = async (city) => {
  let nameUpper = city.charAt(0).toUpperCase() + city.slice(1)
  const uri = process.env.DB_URI;
  let mongoClient;

  try {
    mongoClient = await connectToCluster(uri);
    const db = mongoClient.db("webcrawler");
    const collection = db.collection("weather");

    let data = await findForecastByName(collection, { name: nameUpper });
    
    if (data.length == 0) {
      try {
        const apiKey = process.env.APIKEY
        const url = "http://api.weatherapi.com/v1/forecast.json"
        const response = await axios.get(url, {
            params:{
                key:apiKey,
                q:nameUpper,
                days:1
            }
        })
         const data = await response.data

         if(data){
             await createWebCrawlerDocument(collection, data)

         }

         
                console.log("Mostrando o que aparece: ", await data)
        return [data];
      } catch (error) {
        console.log("Erro identificado: " + error);
      }
    }

    return data;
  } finally {
    await mongoClient.close();
  }
};
