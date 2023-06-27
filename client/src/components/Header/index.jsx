import React from "react";
import NavBar from "../Navbar";
import "./Header.css"
import { Link } from "react-router-dom";
export default function Header() {
    return (
        <header>
            <NavBar />
            <div className="header flex light-bg">
                <div className="header-content">
                
                    <h1 className="white" >This is a Decentralized exchange.</h1>
                    <h1 className="white" style={{ marginBottom: "30px" }}>Let's try it!</h1>
                    <Link to="/dashboard">
                    <button type="button" href ="/dashboard" className="larger-button" >GO TO TRANSACTION</button>
                    </Link>
                    {/* <p className="gray">I design and code beautiful simple things, and I love what I do.</p> */}
                    {/* <a className="green" href="mailto:contact@blaiti.com">Let's chat!</a> */}
                </div>
                <div style={{ transform: "translateX(-150px)" }}>
          <img src="/logo.png" width="400" height="400" />
        </div>
            </div>
        </header>
    )
}