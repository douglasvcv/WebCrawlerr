import React, { useEffect } from "react"
import { useState } from "react"


function Content(){
    const [content, setContent] = useState("")

    function ContentChange(){
        console.log("dadssad")
    }
    function Pesquisar(){
        console.log("dadssad")
    }

    return(
        
        <div className="container">
            <div className="search">
                <input type="text" placeholder="Cidade" onChange={ContentChange}/>
                <button onClick={Pesquisar}>Previsão</button>
            </div>
        </div>
        
    )
}

export default Content