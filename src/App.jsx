import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="text-primary font-sans p-4 bg-gray-100">
          <h1 className="text-3xl font-bold">Hello Tailwind v4!</h1>
          <button className="bg-primary text-white p-2 rounded mt-4">Click Me</button>
        </div>
    </>
  )
}

export default App
