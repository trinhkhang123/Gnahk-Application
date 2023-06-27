import React from 'react'
import { useState } from "react"
import axios from 'axios'
import {toast} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'

import { createContext,useEffect } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [data,setData] = useState({
        name:'',
        userName:'',
        password:'',
    })
  const registerUser = async (e) => {
    //console.log(data);
    e.preventDefault();
    const {name, userName, password}  = data
    //console.log(userName);
    //console.log(name)
    
    try {
      const {data} =await axios.post('/register',{
        name,userName,password
      })

      console.log(data);

      if (data.error) {
        toast.error(data.error);
      }
      else {
        setData({})
        toast.success('Sign In Successful. Welcome');
        
        navigate('/login')
      }
    } catch (error) {
      console.log(error)      
    }
  }
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
  
    if (isLoggedIn === "true") {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={registerUser}>
          <h3>Register</h3>

          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Full name"
              value = {data.name} onChange={(e) =>setData({...data,name:e.target.value})}
            />
          </div>

          <div className="mb-3">
            <label>User name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value = {data.userName} onChange={(e) =>setData({...data,userName:e.target.value})}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value = {data.password} onChange={(e) =>setData({...data,password:e.target.value})}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/login">sign in?</a>
          </p>
        </form>
      </div>
    </div>
  )
}
