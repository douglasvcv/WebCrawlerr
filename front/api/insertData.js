import { api } from "./api";
import { getWeather } from "./getWeather";
import { MongoClient } from "mongodb";

export async function insertData(data) {
  const uri = import.meta.env.VITE_DB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    const database = client.db("webcrawler");
    const collection = database.collection("weather");
    const result = collection.insertOne(data);
    console.log(`${result.insertedCount} documentos inseridos.`);
  } catch (error) {
    console.log(`Não foi possível continuar: ${error}`);
  } finally {
    await client.close();
  }
}

export async function getAndInsertWeatherData(cities){
    for(let city = 0; city < cities.length; city++){
        const forecastData = await getWeatherForecast(cities[city])

        if(forecastData){
            console.log(`Previsão do tempo para ${cities[city]}:`);
            console.log(forecastData);
            console.log();

            await insertData(forecastData)
        }else{
            console.log(`Não foi possível obter a previsão do tempo para ${cities[city]}`);
        
        }
    }
}