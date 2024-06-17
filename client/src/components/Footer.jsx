import React from 'react';
import { FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto text-center">
                <div className="flex justify-center space-x-8 mb-6">
                <Link to="/"> <button className='hover:bg-gray-600 rounded-sm p-1'>Inicio</button></Link>
                <Link to="/Products"><button className='hover:bg-gray-600 rounded-sm p-1'>Productos</button></Link>
                <Link to="/Categorias"><button className='hover:bg-gray-600 rounded-sm p-1'>Categorias</button></Link>
                <Link to="/Cart"><button className='hover:bg-gray-600 rounded-sm p-1'>Carrito</button></Link>
                </div>
                <div className="flex flex-col items-center mb-6">
                    <div className="flex items-center mb-2">
                        <FaWhatsapp className="mr-2" />
                        <span>1168459923</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaPhone className="mr-2" />
                        <span>42379487</span>
                    </div>
                    <div className="flex items-center">
                        <FaEnvelope className="mr-2" />
                        <span>contacto@kurosawa.com.ar</span>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-gray-400">&copy; 2024 Kurosawa. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
