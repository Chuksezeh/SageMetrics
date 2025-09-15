import { useState } from 'react'
import './App.css'
import HomePage from './Hompage/homePage'
import Dashboard from './Layout/Dashboard/dashboard'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
