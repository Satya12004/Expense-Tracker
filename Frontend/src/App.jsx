import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUp from './Pages/SignUp'
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Navbar from './Components/Navbar'
import UserContext from './Context/UserContext'
function App() {

let loginUser=useContext(UserContext)
console.log(loginUser)
let login=loginUser.userdata.login


  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/signup'element={login===false?<SignUp/>:<Navigate to={'/'}/>}/>
      <Route path='/'element={login===true?<Home/>:<Navigate to={'/login'}/>}/>
      <Route path='/login'element={login===false?<Login/>:<Navigate to={'/'}/>}/>
      
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
