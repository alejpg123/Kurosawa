import React, { useContext } from "react";
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
            <Sidebar />
        </header>
        </main>
        </>
    ) 
}

export default Home