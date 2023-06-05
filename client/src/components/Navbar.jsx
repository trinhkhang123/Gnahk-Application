import React from 'react'
import {Link} from "react-router-dom" 

export default function Navbar() {
  return (
    <div>
       <Link to='/home'>Home {'   '} </Link>
      
       <Link to='/dashboard'>Dashboard {'   '} </Link>
      
    </div>
  )
}
