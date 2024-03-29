import React, { useEffect } from "react"
import { useState } from "react"
import { getWeather } from "../../api/getWeather"

//import { executeWebCrawlerFindOperation } from "../../api/server"

function Content(){
    const [content, setContent] = useState("")
    const [result, setResult] = useState()
    const [image, setImage] = useState()

    function ContentChange(e){
        setContent(e.target.value)
    }
  async  function Pesquisar(){
      const data =  await getWeather(content)
      setResult(data)
      console.log(result.location.name)
     
    }
    useEffect(()=>{
        if(content){
          let result =  executeWebCrawlerFindOperation(content.location.name)
          return result
        }else{
            
        }
    }, [])

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