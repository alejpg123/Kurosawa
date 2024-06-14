import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { productsContext } from "../context/ProductsContext";
import SignOut from "./SignOut";

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(productsContext);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === 'overlay') {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="absolute top-3 left-3 z-30 cursor-pointer" onClick={toggleMenu}>
        <div className="w-6 h-1 bg-black mb-1"></div>
        <div className="w-6 h-1 bg-black mb-1"></div>
        <div className="w-6 h-1 bg-black"></div>
      </div>
      {isOpen && (
        <>
          <div
            id="overlay"
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={handleOverlayClick}
          ></div>
          <div className="fixed top-0 left-0 h-full bg-white shadow-lg z-20 p-5 w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 transition-transform transform translate-x-0">
            <div className="flex flex-col justify-between h-full text-black">
              <div className="text-center flex flex-col space-y-4">
                <h1 className="text-2xl font-bold">KUROSAWA</h1>
                <Link to="/" className="text-lg hover:bg-gray-200 p-2 rounded">
                  Inicio
                </Link>
                <Link to="/Products" className="text-lg hover:bg-gray-200 p-2 rounded">
                  Todos los productos
                </Link>
                <Link to="/Categorias" className="text-lg hover:bg-gray-200 p-2 rounded">
                  Categorias
                </Link>
                <Link to="/Cart" className="text-lg hover:bg-gray-200 p-2 rounded">
                  Carrito
                </Link>
              </div>
              <div className=" text-center border-t border-gray-300 pt-4 mt-4">
                {user ? (
                  <div className="flex flex-col space-y-2">
                    <div>{user}</div>
                    <SignOut />
                  </div>
                ) : (
                  <NavLink to="/" className="text-lg hover:bg-gray-200 p-2 rounded">
                    <p>Iniciar Sesión</p>
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default HamburgerMenu;
