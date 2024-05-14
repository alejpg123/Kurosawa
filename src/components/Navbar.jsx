import { NavLink } from "react-router-dom";
import React, { useState, useContext } from 'react';
import Search from "./Search"
import CartSummary from "./CartSummary"
import { productsContext } from "../context/ProductsContext";
import './Navbar.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Navbar() {
    const {user, handleUser } = useContext(productsContext);
    const [color, setColor] = useState(false)
    const changeColor = () => {
        if (window.scrollY >= 180) {
            setColor(true)
        } else {
            setColor (false)
        }
    }
    window.addEventListener('scroll', changeColor)
    
    return (
        <nav className={color ? 'nav secondColor' : 'nav'}>
            <Search />
            <NavLink to="../Cart"><CartSummary/><ShoppingCartIcon /></NavLink>
        </nav>
    )
}

export default Navbar