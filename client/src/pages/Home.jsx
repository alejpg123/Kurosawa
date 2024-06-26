import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import RegisterForm from "../components/RegisterForm.jsx";
import { productsContext } from "../context/ProductsContext.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import Footer from "../components/Footer.jsx";
import Whatsapp from "../components/Whatsapp.jsx"

function Home() {
  const { user, products, iniciaSesionAlert, addQuantity, restQuantity } = useContext(productsContext);
  const { addToCart } = useContext(productsContext);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [clickedProduct, setClickedProduct] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {});
  }, []);

  const getBestProducts = () => {
    const sortedProducts = products.sort((a, b) => b.rating - a.rating);
    return sortedProducts.slice(0, 4);
  };

  const bestProducts = getBestProducts();

  const handleAddToCart = (product) => {
    if (user) {
      setClickedProduct(product.id);
      addToCart(product);
      setTimeout(() => {
        setClickedProduct(null);
      }, 3000);
    } else {
      iniciaSesionAlert();
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url('./images/back3.png')` }}>
      </div>
      <main className="min-h-screen flex flex-col items-center justify-center w-full">
        {user ? (
          <>
            <header>
              <Navbar />
            </header>
            <div className="flex flex-wrap items-center justify-center gap-8 mb-10 ">
              <div className="w-1/3 sm:w-auto">
                <img src="./images/cuotas.png" alt="cuotas" className="w-full sm:w-auto" />
              </div>
              <div className="w-1/3 sm:w-auto">
                <img src="./images/envios.png" alt="envios" className="w-full sm:w-auto" />
              </div>
              <div className="w-1/3 sm:w-auto">
                <img src="./images/15off.png" alt="15% off" className="w-full sm:w-auto" />
              </div>
            </div>
            <div className="w-full py-16 bg-gray-200">
                <h2 className="text-4xl font-bold mb-4 text-center text-black">PRODUCTOS DESTACADOS</h2>
              <div>
                <div className="flex justify-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 max-w-screen-lg">
                    {bestProducts.map((product) => {
                      const isClicked = clickedProduct === product.id;
                      return (
                        <div
                          key={product.id}
                          className={`w-80 bg-white shadow rounded m-4 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-gray-400 ${isClicked ? 'bg-indigo-200' : ''}`}
                        >
                          <div
                            className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
                            style={{ backgroundImage: `url(${product.thumbnail})` }}
                          >
                            <div>
                              <span className="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium select-none">
                                Disponible
                              </span>
                            </div>
                          </div>
                          <div className="p-4 flex flex-col items-center">
                            <p className="text-gray-400 font-light text-xs text-center">{product.category}</p>
                            <h1 className="text-gray-800 text-center mt-1">{product.title}</h1>
                            <p className="text-center text-gray-800 mt-1">${product.price}</p>
                            <div className="inline-flex items-center mt-2">
                              <button
                                onClick={() => restQuantity(product.id)}
                                className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                </svg>
                              </button>
                              <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
                                {product.quantity}
                              </div>
                              <button
                                onClick={() => addQuantity(product.id)}
                                className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-4"
                                  fill="none"
                                  viewBox="0 24 24"
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </div>
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="py-2 px-4 bg-custom-coral text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center"
                            >
                              Agregar al carrito
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 ml-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <NavLink to="/products">
                <div className="flex mt-4 text-center ">
                  <div className="m-auto max-w-screen-lg w-full">
                    <button className="gap-1 h-10 px-6 py-2 mt-2 text-white font-semibold rounded-md bg-custom-green-yellow hover:bg-indigo-500">Ver más productos</button>
                  </div>
                </div>
              </NavLink>
            </div>
          </>
        ) : (
          <div className="w-full flex flex-col items-center justify-center p-4">
            <header className="w-full">
              <Navbar />
            </header>
            <div className="w-full">
              {!showRegisterForm ? (
                <>
                  <SignUpForm />
                  <p className="text-center mt-4">No tienes usuario?</p>
                  <button
                    onClick={() => setShowRegisterForm(true)}
                    type="submit"
                    className="text-white block mx-auto py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 mt-2"
                  >
                    Crear una cuenta
                  </button>
                </>
              ) : (
                <>
                  <RegisterForm />
                  <p className="text-center mt-4">Tienes usuario?</p>
                  <button
                    onClick={() => setShowRegisterForm(false)}
                    type="submit"
                    className="text-white block mx-auto py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 mt-2"
                  >
                    Iniciar sesión
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer className="mt-auto" />
      <Whatsapp />
    </>
  );
} 

export default Home;
