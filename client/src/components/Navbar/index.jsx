import React from "react";
import Link from "next/link";
import axios from 'axios'
import {useState,useEffect} from 'react'
import "./Navbar.css"


export default function  NavBar({account}) {

    const signOut = () => {
        // Xử lý sự kiện khi người dùng nhấn vào nút
        localStorage.clear();
        const isLoggedIn = localStorage.getItem("loggedIn");
        console.log(isLoggedIn);
        navigate('/login');
      };

      const token = localStorage.getItem("token");

      
        //const {name} = await (responce.data);

       // console.log(responce);\
         const name = localStorage.getItem('name');
         //console.log(name);
     
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn !== 'true')
    return (
        <nav className="flex light-bg justify-space">
            <div className="logo white">
                <Link href="/"><h3>Gnahk app</h3></Link>
            </div>
            
            
            <ul className="flex white">
                <li className="green">
                    <Link href="/"><h5>{"Home"}</h5></Link>
                </li>
                <li className="green">
                    <Link href="/dashboard"><h5>{"DashBoard"}</h5></Link>
                </li>
                
                <li>
                    <Link href="/login"><h5>Sign In </h5></Link>
                </li>
                <li>
                    <Link href="/register" ><h5>Sign Up </h5></Link>
                </li>

            </ul>
        </nav>
    )

    else {
        return (
            <nav className="flex light-bg justify-space">
                <div className="logo white">
                    <Link href="/"><h2>Gnahk app</h2></Link>
                </div>
                <ul className="flex white">
                <li className="green">
                    <Link href="/dashboard"><h5>{"DashBoard"}</h5></Link>
                </li>
                <li className="green">
                    <Link href="/"><h5>{"Home"}</h5></Link>
                </li>

                <li className="blue">
                    <h5>Hi, {name}   </h5>
                </li>

                <li>
                    <Link href="/home" onClick = {signOut}><h5>Sign Out </h5></Link>
                </li>
    
                </ul>
                

            </nav>
            
        )
    }
    
}