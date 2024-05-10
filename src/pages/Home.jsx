import React from "react";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";
import "./Home.css"
import Sidebar from "../components/Sidebar"


function Home () {
    return (
        <>
        <main className="main">
        <header>
            <Navbar />
        </header>
        <Sidebar />
        
        </main>
        </>
    ) 
}

export default Home