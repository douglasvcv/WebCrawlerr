import { api } from "./api"


export const getWeather = async (city) =>{
    try {
        const apiKey = import.meta.env.VITE_APIKEY
        const endPoint = "/forecast.json"
        const response = await api.get(endPoint, {
            params:{
                key:apiKey,
                q:city,
                days:1
            }
        })
       console.log(response.data)
        return response.data
    } catch (error) {
        console.error('Erro ao obter a previsão do tempo:', error);
        return null;
    }
}