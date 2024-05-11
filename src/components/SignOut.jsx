import React, { useContext } from 'react';
import { productsContext } from "../context/ProductsContext";
import { auth } from "../firebase.js";

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
            <button onClick={signOut}>Salir de la sesión</button>
    )
}

export default SignOut