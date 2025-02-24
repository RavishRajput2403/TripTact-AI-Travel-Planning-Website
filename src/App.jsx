import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import Hero from './components/ui/custom/Hero'
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Hero/>
     <SpeedInsights/>
    </>
  )
}

export default App
