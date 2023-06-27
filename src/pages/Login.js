import React from 'react'
import { useState } from "react"
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { createContext,useEffect } from "react";

export default function Login() {
  const navigate = useNavigate()
  
  const [data,setData] = useState({
      userName:'',
      password:''
  })

  const loginUser = async (e) => {
    e.preventDefault()
    const {userName,password} = data;

    try {
      
      const {data} = await axios.post('/login',{
        userName,password
      })

      //console.log(data);
      if(data.error) {
        toast.error(data.error)
      }
      //navigate('/dashboard');
      else {
        const getInfo = async () => {
          //console.log(token);
          const responce = await axios.get('/profile',{
              params: {
                  key1: data.data
              }
            });
            return responce;
        }

        const user =await getInfo();

        //console.log(user.data.name);
      //  setData({})
        //console.log(data.data);
        localStorage.setItem("token",data.data);
       // console.log(3);
        localStorage.setItem("loggedIn",true);

        localStorage.setItem("name",user.data.name);
        navigate('/home');
      }
    } catch (error) {
     console.log(error);
    }
  }

  //const isLoggedIn = localStorage.getItem("loggedIn");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
  
    if (isLoggedIn === "true") {
      navigate('/home');
    }
  }, [navigate]);

  return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={loginUser}>
            <h3>Sign In</h3>
  
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
                Submit
              </button>
            </div>
            <p className="forgot-password text-right">
              <a href="/register">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    );
}
