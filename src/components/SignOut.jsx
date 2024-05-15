import React, { useContext } from 'react';
import { productsContext } from "../context/ProductsContext";
import { auth } from "../firebase.js";
import { useState } from 'react';

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
            <button onClick={signOut}  className='Button'>Salir de la sesión {user}</button>
    )
}

export default SignOut