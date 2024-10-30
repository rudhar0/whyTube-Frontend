
import { useState } from 'react'
import './App.css'
import Login from './pages/Login'

function App() {
  const [user,setUser] = useState()
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  

  return (
    <div className=' bg-black h-[100vh]  w-[100wh] flex justify-center items-start'>
    <Login/>
    </div>
  )
}

export default App
