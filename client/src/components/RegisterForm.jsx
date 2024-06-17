import React, { useContext, useState } from "react";
import { productsContext } from "../context/ProductsContext.jsx";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { colors } from "@mui/material";
import { FaFacebook } from 'react-icons/fa';

function RegisterForm() {
    const { user, handleUser } = useContext(productsContext);
    const [error, setError] = useState(null);
    const [passwordStrength, setPasswordStrength] = useState(null);

    const evaluatePasswordStrength = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasNonAlphanumeric = /\W/.test(password);
    
        if (password.length < 6 || !(hasUpperCase && hasLowerCase && hasNumber && hasNonAlphanumeric)) {
            return "weak";
        } else if (password.length < 10) {
            return "normal";
        } else {
            return "strong";
        }
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setPasswordStrength(evaluatePasswordStrength(password));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password, passwordRepeat, name, cellphone, adress, remember } = e.target.elements;
        
        if (!email.value || !password.value || !passwordRepeat.value || !name.value || !cellphone.value || !adress.value || !remember.checked) {
            setError("Por favor completa todos los campos y acepta las políticas de privacidad para crear el usuario.");
            return;
        }

        if (password.value !== passwordRepeat.value) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
            setError("Por favor ingresa un email válido.");
            return;
        }

        if (!/^\D+$/.test(name.value)) {
            setError("El nombre no puede contener números.");
            return;
        }

        if (cellphone.value.length < 8) {
            setError("El número de teléfono debe tener al menos 8 dígitos.");
            return;
        }

        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                handleUser(userCredential.user.email);
                console.log(user);
            })
            .catch((err) => {
                const errorCode = err.code;
                const errorMessage = err.message;

                setError("El mail y/o la contraseña no son válidos.");
                console.error(errorCode);
                console.error(errorMessage);
            });
    };

    return (
        <div className="bg-gray-800">
            <div className="p-8 lg:w-1/2 mx-auto">
                <div className="bg-white rounded-t-lg p-8">
                    <p className="text-center text-sm text-gray-400 font-light">Registrarse con</p>
                    <div>
                        <div className="flex items-center justify-center space-x-4 mt-3">
                        <button
                className="flex items-center py-2 px-4 text-sm uppercase rounded bg-white hover:bg-gray-100 text-indigo-500 border border-transparent hover:border-transparent hover:text-gray-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              >
                <FaFacebook className="w-6 h-6 mr-3" /> Facebook
              </button>
                            <button
                                className="flex items-center py-2 px-4 text-sm uppercase rounded bg-white hover:bg-gray-100 text-indigo-500 border border-transparent hover:border-transparent hover:text-gray-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 mr-3"
                                    viewBox="0 0 48 48">
                                    <path
                                        fill="#fbc02d"
                                        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
                                    <path
                                        fill="#e53935"
                                        d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"></path>
                                    <path
                                        fill="#4caf50"
                                        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
                                    <path
                                        fill="#1565c0"
                                        d="M43.611 20.083 43.595 20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
                                </svg>
                                Google
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 rounded-b-lg py-12 px-4 lg:px-24">
                    <p className="text-center text-sm text-gray-500 font-light">O crear nuevo usario</p>
                    <form onSubmit={handleSubmit} className="mt-6">
                        <div className="relative">
                            <input
                                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600 transition rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                                id="email"
                                type="text"
                                placeholder="Email"
                                name="email" />
                            <div className="absolute left-0 inset-y-0 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="h-7 w-7 ml-3 text-gray-400 p-1"
                                    viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path
                                        d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                </svg>
                            </div>
                        </div>
                        <div className="relative mt-3">
                            <input
                                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600 transition rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Contraseña"
                                name="password" 
                                onChange={handlePasswordChange}/>
                            <div className="absolute left-0 inset-y-0 flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-7 w-7 ml-3 text-gray-400 p-1"
                                    viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                                </svg>
                            </div>
                        </div>
                        <div className="relative mt-3">
                            <input
                                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600 transition rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                                id="passwordRepeat"
                                type="password"
                                placeholder="Repite la contraseña"
                                name="passwordRepeat" />
                          <div className="absolute left-0 inset-y-0 flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-7 w-7 ml-3 text-gray-400 p-1"
                                    viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                                </svg>
                            </div>
                        </div>
                            <div className="relative mt-3">
                            <input
                                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600 transition rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="Nombre completo"
                                name="name" />
                            <div className="absolute left-0 inset-y-0 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                fill="currentColor" 
                                className="h-7 w-7 ml-3 text-gray-400 p-1"
                                viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                            </svg>
                            </div>
                        </div>
                        <div className="relative mt-3">
                            <input
                                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600 transition rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                                id="cellphone"
                                type="number"
                                placeholder="Teléfono"
                                name="cellphone" />
                            <div className="absolute left-0 inset-y-0 flex items-center">
                             <svg xmlns="http://www.w3.org/2000/svg" 
                                fill="currentColor" 
                                className="h-7 w-7 ml-3 text-gray-400 p-1"
                                viewBox="0 0 16 16">
                                <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                            </svg>
                            </div>
                        </div>
                        <div className="relative mt-3">
                            <input
                                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600 transition rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                                id="adress"
                                type="text"
                                placeholder="Dirección"
                                name="adress" />
                            <div className="absolute left-0 inset-y-0 flex items-center">
                            <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="currentColor" 
                            className="h-7 w-7 ml-3 text-gray-400 p-1"
                            viewBox="0 0 20 20">
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                            </svg>
                            </div>
                        </div>
                        <p className="mt-4 italic text-gray-500 font-light text-xs">Seguridad de la contraseña:
                            <span className={`font-bold ${
                                passwordStrength === "weak" ? "text-red-500" :
                                passwordStrength === "normal" ? "text-orange-500" :
                                "text-green-400"
                                }`}>
                                {passwordStrength}
                            </span>
                        </p>

                        <div className="mt-4 flex items-center text-gray-500">
                            <input
                                type="checkbox"
                                id="remember"
                                name="remember"
                                className="mr-2" />
                            <label
                                className="text-sm"
                                htmlFor="remember">Estoy de acuerdo con las
                                <a className="text-indigo-400 hover:text-indigo-500"> políticas de privacidad</a></label>
                        </div>
                        {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
                        <div className="flex items-center justify-center mt-8">
                            <button type="submit"
                                className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">Crear cuenta</button></div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;