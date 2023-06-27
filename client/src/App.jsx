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
import HistoryTransaction from './components/HistoryTransaction'

axios.defaults.baseURL = 'http://172.20.10.2:8000';
axios.defaults.withCredentials = true;
function App() {
  const isLoggedIn = localStorage.getItem("loggedIn");
  //console.log(isLoggedIn)
  return (
    <>
    <Toaster position = 'bottom-right' toastOptions ={{ duration:2000 }}/>
    <Routes>
      <Route path = '/' element={<Home/>} />
      <Route path = '/register' element={<Register />} />
      <Route path = '/login' element={<Login />} />
      <Route path = '/hehe' element={<HistoryTransaction />} />
      <Route
      path='/dashboard' 
      element ={<Dashboard/>} />
      <Route
      path='/home' 
      element ={<Home/>} />
    </Routes>
    </>
  )
}

export default App