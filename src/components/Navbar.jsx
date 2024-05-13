import { NavLink } from "react-router-dom";
import React, { useState } from 'react';
import Search from "./Search"
import CartSummary from "./CartSummary"
import './Navbar.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Navbar() {
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
            <NavLink to="/"><h1>KUROSAWA</h1></NavLink>
            <NavLink to="../Cart"><CartSummary/><ShoppingCartIcon /></NavLink>
        </nav>
    )
}

export default Navbar