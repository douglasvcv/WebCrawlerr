import React, { useEffect } from "react"
import { useState } from "react"
import { getWeather } from "../../api/getWeather"

function Content(){
    const [content, setContent] = useState("")

    function ContentChange(e){
        setContent(e.target.value)
    }
  async  function Pesquisar(){
      const data =  await getWeather(content)
      console.log(data)
    }

    return(
        
        <div className="container">
            <div className="search">
                <input type="text" placeholder="Cidade" onChange={ContentChange}/>
                <button onClick={Pesquisar}>Previsão</button>
                <p>{}</p>
            </div>
        </div>
        
    )
}

export default Content