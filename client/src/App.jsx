import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route} from 'react-router-dom' 
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'
import Dashboard from './pages/Dashboard'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
//import "./App.css";

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
function App() {
  const isLoggedIn = localStorage.getItem("loggedIn");
  //console.log(isLoggedIn)
  return (
    <>
    <Navbar />
    <Toaster position = 'bottom-right' toastOptions ={{ duration:2000 }}/>
    <Routes>
      <Route path = '/' element={<Home />} />
      <Route path = '/register' element={<Register />} />
      <Route path = '/login' element={<Login />} />
      <Route
      
      path='/dashboard' 
      element ={<Dashboard/>} />
    </Routes>
    </>
  )
}

export default App