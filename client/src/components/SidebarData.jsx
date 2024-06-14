import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SellIcon from '@mui/icons-material/Sell';

export const SidebarData = [
    {
        title: "Home",
        link: "/",
        icon: <HomeIcon />
    },
    {
        title: "Todos los productos",
        link: "/products",
        icon: <SellIcon />
    },
    {
        title: "Categorías",
        link: "/categorias",
        icon: <AutoAwesomeMosaicIcon />
    },
    {
        title: "Carrito",
        link: "../Cart",
        icon: <ShoppingCartIcon />
    },
]
