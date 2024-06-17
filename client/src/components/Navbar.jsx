import { NavLink } from "react-router-dom";
import React, { useState, useContext } from 'react';
import Search from "./Search";
import { productsContext } from "../context/ProductsContext";
import './Navbar.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HamburgerMenu from "./HamburgerMenu";

function Navbar() {
    const { user } = useContext(productsContext);
    const [color, setColor] = useState(false);

    const changeColor = () => {
        if (window.scrollY >= 180) {
            setColor(true);
        } else {
            setColor(false);
        }
    };

    window.addEventListener('scroll', changeColor);

    return (
        <>
            <nav className={color ? 'nav secondColor' : 'nav'}>
                <div className="flex justify-between">
                    <div className="float-left px-3.5 right-10 opacity-100">
                    <HamburgerMenu />
                    </div>
                    <div className="float-right opacity-100">
                    <Search />
                    </div>
                </div>
                <NavLink to={'/'} className="opacity-100 centerTitle hidden sm:block"><img src="./images/logo.png" alt="Logo Kurosawa" /></NavLink>
                <div className={color ? 'text-white' : 'text-black'}>
                    <NavLink to="/Cart"><ShoppingCartIcon /></NavLink>
                </div>
            </nav>
            <div className="h-16"></div>
        </>
    );
}

export default Navbar;
