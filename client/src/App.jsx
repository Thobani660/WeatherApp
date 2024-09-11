import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Weather from './components/weather'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
     <Weather></Weather>
    </>
  )
}

export default App
