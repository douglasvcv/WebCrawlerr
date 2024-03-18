import React, { useEffect } from "react"
import { useState } from "react"
import { getWeather } from "../../api/getWeather"

function Content(){
    const [content, setContent] = useState("")
    const [result, setResult] = useState()
    const [image, setImage] = useState()

    function ContentChange(e){
        setContent(e.target.value)
    }
  async  function Pesquisar(){
      const data =  await getWeather(content)
     await setResult(data)
     await console.log(result.location.name)
    }

    return(
        
        <div className="container">
            <div className="search">
                <input type="text" placeholder="Cidade" onChange={ContentChange}/>
                <button onClick={Pesquisar}>Previsão</button>
                {result ? <p>Nome: {result.location.name}<br></br>Temperatura(C): {result.current.temp_c}<br></br> <img src={result.current.condition.icon}/> </p>
                        
                : <p>Nome: <br></br>Temperatura(C): </p>}
            </div>
        </div>
        
    )
}

export default Content