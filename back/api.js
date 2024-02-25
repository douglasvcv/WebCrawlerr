import 'dotenv/config'

export const search = async (city) => {
    try {
        const url = `http://api.weatherapi.com/v1/forecast.json?key=`
        const response = await fetch(url+process.env.APIKEY+`&q=${city}&days=1&aqi=no&alerts=no`)
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}