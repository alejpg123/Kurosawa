import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";
import "./Home.css"
import Sidebar from "../components/Sidebar"
import SignUpForm from "../components/SignUpForm"
import RegisterForm from "../components/RegisterForm.jsx";
import { productsContext } from "../context/ProductsContext.jsx";
import SignOut from "../components/SignOut.jsx"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";

function Home () {
    const {user} = useContext(productsContext);
    useEffect(()=> {
        onAuthStateChanged(auth, (user) =>{
     

        })

    },[])

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