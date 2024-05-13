import { NavLink } from "react-router-dom";
import React, { useState } from 'react';
import Search from "./Search"
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
            <div className="First">
                <NavLink to={'/'}><h1>KUROSAWA</h1></NavLink>
            </div>
            <div className="Second">
                <Search />
            </div>
            <div className="Third">
                <NavLink to="../Cart"><ShoppingCartIcon /></NavLink>
            </div>
            <div className="Fourth" >
                <NavLink to={'/components/SignUpForm'}><h1>Salir</h1></NavLink>
            </div>
        </nav>
    )
}

export default Navbar