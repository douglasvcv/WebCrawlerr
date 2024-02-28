import React, { useEffect } from "react"
import { useState } from "react"
import { getWeatherForecast, getAndInsertWeatherData, insertWeatherData } from "../../../back/api"

function Content(){
    const [content, setContent] = useState("")

    
    return(
        
        <div className="container">
            <div className="search">
                <input type="text" placeholder="Cidade" onChange={ContentChange()}/>
                <button onClick={Pesquisar()}>Previsão</button>
            </div>
        </div>
        
    )
}

export default Content