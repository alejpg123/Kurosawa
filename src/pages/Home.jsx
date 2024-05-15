import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";
import "./Home.css"
import Sidebar from "../components/Sidebar"
import SignUpForm from "../components/SignUpForm"
import RegisterForm from "../components/RegisterForm.jsx";
import { productsContext } from "../context/ProductsContext.jsx";
import SignOut from "../components/SignOut.jsx"


function Home () {
    const {user} = useContext(productsContext);
    return (
        <>
        <main className="main">
        <header>
            {user ? (  <Navbar />) : (  <div className="Divisor"></div>)} 
        </header>
        <div style={{ color: "white" }}> 
            {user ? (  <Sidebar />) : (  <div className="Divisor"></div>)} 

            {user ? (<div className="Divisor"></div>) : ( <div className="Title"><h2 >Ingreso</h2></div>)}
          
            <div className="Divisor">
            </div>
        
            {user ? (<div className="Divisor"></div>) : ( <SignUpForm />)}
            {user ? (<div className="Divisor"></div>) : (<RegisterForm />)}
            {user ? (
                <SignOut />
            ) : (
                <p>Sin usuario</p>
            )}
        </div>
        </main>
        </>
    ) 
}

export default Home