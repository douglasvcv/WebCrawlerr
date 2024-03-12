import { useState } from 'react'
import './App.css'
import Content from './components/content'
import env from '../vite.env'

function App() {
  const [count, setCount] = useState(0)
  const apikey = env.apiKey
  return (
    <>
     <Content></Content>
     <p>
      My variable is {}
     </p>
    </>
  )
}

export default App
