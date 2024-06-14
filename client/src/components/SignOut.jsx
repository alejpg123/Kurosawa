import React, { useContext } from 'react';
import { productsContext } from "../context/ProductsContext";
import { auth } from "../firebase.js";
import { NavLink } from "react-router-dom";

function SignOut() {
    const {user, handleUser } = useContext(productsContext);
    const signOut = () => {
        auth.signOut()
        .then(() => 
            handleUser(null))
        .catch((err) => {
            console.error(err)
        })
    }
    return (
            <NavLink to="/"><button onClick={signOut}  className='text-center text-black'>Cerrar sesión</button></NavLink>
    )
}

export default SignOut