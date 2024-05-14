import React, { useContext, useState } from "react";
import { productsContext } from "../context/ProductsContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js"
import  './SignUpForm.css'

function SignUpForm () {
    const {user, handleUser } = useContext(productsContext);
    const [error, setError] = useState(null)
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            handleUser(userCredential.user.email);
            console.log(user)
            setError(null)
        })
        .catch((err) => {
            const errorCode = err.code
            console.error(errorCode)
            setError("El mail y/o la contraseña no son válidos.")
        })
    }
    return (
<<<<<<< HEAD
        
        <form onSubmit={handleSubmit}>
            Ingresar
            <label>
            Email:
            <input 
            type="text" 
            placeholder="email@dominio.com"
            name="email"/>
            </label>
            <label>
            Password:
            <input  
            type="password" 
            placeholder="Contraseña"
            name="password"/>
            </label>
            <p style={{ color: "tomato" }}>{error}</p>
            <button type="submit">Iniciar Sesión</button>
=======
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Ingresar Email: <input type="text" placeholder="email@dominio.com" name="email"/>
                </label>
             </div>
             <div className="Divisor">
             </div>
             <div>
                <label>
                    Contraseña    : <input type="password" placeholder="Contraseña" name="password"/>
                </label>
            <div>
            </div>
                <p style={{ color: "tomato" }}>{error}</p>
                <button type="submit" className="Button">Ingresar</button>
            </div>
            <div className="Divisor">
             </div>
>>>>>>> 36557eb7294c526107c7900bc7de29c608278a10
        </form>
        
    )
}

export default SignUpForm;