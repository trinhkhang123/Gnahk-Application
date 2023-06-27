import React from "react";
import Image from "next/image";

import NavBar from "../Navbar";

export default function Header() {
    return (
        <header>
            <NavBar />
            <div className="header flex light-bg">
                <div>
                    <button>Fullstack Developer</button>
                    <h1 className="white">Talk is cheap.</h1>
                    <h1 className="white">Show me the code!</h1>
                    {/* <p className="gray">I design and code beautiful simple things, and I love what I do.</p> */}
                    {/* <a className="green" href="mailto:contact@blaiti.com">Let's chat!</a> */}
                </div>
                <img src="/images/ronaldo.jpg" width="463" height="513" alt="blaiti" />
            </div>
        </header>
    )
}