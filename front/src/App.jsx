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
    </>
  )
}

export default App
