import { useState } from "react";
import { ethers } from "ethers";
// Import ABI Code to interact with smart contract
import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register" 

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
}

export default App;
