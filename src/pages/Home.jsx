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
    const {user, products} = useContext(productsContext);
    useEffect(()=> {
        onAuthStateChanged(auth, (user) =>{
        })
    },[])

    const getBestProducts = () => {
        const sortedProducts = products.sort((a, b) => b.rating - a.rating);
        return sortedProducts.slice(0, 4);
      };
    
      const bestProducts = getBestProducts();

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
                <div className="destacados">
            <div className="Title">
                <h2 >Productos destacados</h2>
            </div>
            <div className="Divisor">
            </div>
              <div>
                {bestProducts.map((product) => (
                        <div key={product.id}> 
                        <h3 className="LinesTitleProduct">{product.title}</h3>
                        <div className="images">
                            <center>
                                <img src={product.thumbnail} alt={product.title} />
                            </center>
                        </div>
                        <div className="CenterDescriptionPart"> 
                            <p className="lines">{product.description.slice(0, 40)}...</p>
                            <div className="lines">
                                <p>${product.price}</p>
                            </div>
                        </div>
                        <div className="Divisor">
                        </div>
                        <div className="Divisor">
                        </div>
                    </div>
                ))}
              </div>
              <SignOut />
            </div>
            
          ) : (
    <p></p>
)}
        </div>
        </main>
        </>
    ) 
}

export default Home