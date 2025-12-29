import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar1 from './components/Navbar1'
import Navbar2 from './components/Navbar2'
import { createBrowserRouter,Routes,Route, BrowserRouter,Navigate } from 'react-router-dom'
import Present from './components/Present'
import Future from './components/Future'
import Death from './components/Death'
import Signup from './components/Signup'
import Login from './components/Login'
import axios from 'axios'
import Root from './components/Root'


axios.defaults.baseURL='https://life-vault.onrender.com/';
axios.defaults.withCredentials=true

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      
      <Navbar1 />
      <Navbar2 />

        <Routes>
          <Route path="/" element={<Navigate to="/Present" replace />} />

          <Route path="/future" element={<Future />} />
          <Route path="/present" element={<Present />} />
          <Route path="/death" element={<Death />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
