import 'dotenv/config'

import axios from 'axios'
import { MongoClient } from 'mongodb'



export async function getWeatherForecast(city){
    try {
        const apiKey = process.env.APIKEY
        const url = "http://api.weatherapi.com/v1/forecast.json"
        const response = await axios.get(url, {
            params:{
                key:apiKey,
                q:city,
                days:1
            }
        })
        console.log(apiKey)
        return response.data
    } catch (error) {
        console.error('Erro ao obter a previsão do tempo:', error);
        return null;
    }
}

export async function insertWeatherData(data){
    const uri = process.env.DB_URI
    const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true })

    try {
        await client.connect()
        const database = client.db('webcrawler')
        const collection = database.collection('weather')

        const result = await collection.insertOne(data)
        console.log(`${result.insertedCount} documentos inseridos.`)
    } catch (error) {
        console.error('Erro ao inserir os dados no MongoDB Atlas:', error)
    }finally{
        await client.close()
    }
}

const cities = ['brasilia']


export async function getAndInsertWeatherData(cities){
    for(let city = 0; city < cities.length; city++){
        const forecastData = await getWeatherForecast(cities[city])

        if(forecastData){
            console.log(`Previsão do tempo para ${cities[city]}:`);
            console.log(forecastData);
            console.log();

            await insertWeatherData(forecastData)
        }else{
            console.log(`Não foi possível obter a previsão do tempo para ${cities[city]}`);
        
        }
    }
}




