import { api } from "./api"


export const getWeather = async (city) =>{
    try {
        const apiKey = import.meta.env.VITE_APIKEY
        const endPoint = "/info"
        const response = await api.get(endPoint, {
            params:{
                city
            }
        })
       console.log(response.data)
        return response.data[0]
    } catch (error) {
        console.error('Erro ao obter a previsão do tempo:', error);
        return null;
    }
}