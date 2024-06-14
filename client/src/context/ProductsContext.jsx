import React, { useEffect, useState, createContext } from "react";
import { getAllProducts, getCartFromStorage } from "../services/productService";
import { initialProduct } from "../services/initialProduct";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const productsContext = createContext([initialProduct]);

export const ProductsContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortedMaxToMin, setSortedMaxToMin] = useState(false);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [minPrice, setMinPrice] = useState(0);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [cart, setCart] = useState(getCartFromStorage());
    const [user, setUser] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.email);
            }
        });
    }, []);

    const handleSort = () => {
        const sortedProducts = [...products].sort((a, b) => {
            return sortedMaxToMin ? a.price - b.price : b.price - a.price;
        });
        setProducts(sortedProducts);
        setSortedMaxToMin(!sortedMaxToMin);
    };

    const handleSearch = (search) => setSearch(search.toLowerCase());
    const handleMaxPrice = (priceMax) => setMaxPrice(priceMax === '' ? Infinity : Number(priceMax));
    const handleMinPrice = (priceMin) => setMinPrice(priceMin === '' ? 0 : Number(priceMin));
    const handleCategory = (category) => setCategory(category);
    const handleUser = (user) => setUser(user);

    const iniciaSesionAlert = () => {
        Swal.fire({
            title: `Inicia sesión para comprar.`,
            icon: 'info',
            confirmButtonText: 'Ok'
        });
    };

    const addToCartAlert = (prod) => {
        Swal.fire({
            text: `${prod.title} agregado a su carrito.`,
            icon: 'success',
            confirmButtonText: 'Ok'
        });
    };

    const addToCart = (prod) => {
        const existingProduct = cart.find(item => item.id === prod.id);
        let newCart;
        if (existingProduct) {
            newCart = cart.map(item =>
                item.id === prod.id ? { ...item, quantity: item.quantity + (prod.quantity || 1) } : item
            );
        } else {
            newCart = [...cart, { ...prod, quantity: prod.quantity || 1 }];
        }
        setCart(newCart);
        window.localStorage.setItem('cart', JSON.stringify(newCart));
        addToCartAlert(prod);
    };

    const addQuantity = (prodId) => {
        setProducts((prevProducts) =>
            prevProducts.map((item) =>
                item.id === prodId ? { ...item, quantity: (item.quantity || 0) + 1 } : item
            )
        );
    };

    const restQuantity = (prodId) => {
        setProducts((prevProducts) =>
            prevProducts.map((item) =>
                item.id === prodId && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    };

    const removeFromCartAlert = (prod) => {
        Swal.fire({
            text: `${prod.title} se ha eliminado de su carrito.`,
            icon: 'success',
            confirmButtonText: 'Ok'
        });
    };

    const removeFromCart = (id) => {
        const item = cart.find(item => item.id === id);
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        window.localStorage.setItem('cart', JSON.stringify(updatedCart));
        removeFromCartAlert(item);
    };

    const cleanCartAlert = () => {
        Swal.fire({
            title: 'Carrito vaciado.',
            text: 'Tu carrito se ha vaciado exitosamente.',
            icon: 'success',
            confirmButtonText: 'Ok'
        });
    };

    const cleanCart = () => {
        setCart([]);
        window.localStorage.setItem('cart', JSON.stringify([]));
        cleanCartAlert();
    };

    const toggleSelectProduct = (product) => {
        setSelectedProducts((prevSelected) => {
            const isSelected = prevSelected.some((p) => p.id === product.id);
            if (isSelected) {
                return prevSelected.filter((p) => p.id !== product.id);
            } else {
                return [...prevSelected, product];
            }
        });
    };

    const productsNotSelectedAlert = () => {
        Swal.fire({
            text: 'Selecciona productos para agregar al carrito por favor',
            icon: 'info',
            confirmButtonText: 'Ok'
        });
    };

    const addSelectedToCartAlert = () => {
        Swal.fire({
            title: 'Productos agregados.',
            icon: 'success',
            confirmButtonText: 'Ok'
        });
    };

    const addSelectedToCart = () => {
        const newCart = [...cart];
        selectedProducts.forEach((prod) => {
            const existingProduct = newCart.find(item => item.id === prod.id);
            if (existingProduct) {
                existingProduct.quantity += prod.quantity || 1;
            } else {
                newCart.push({ ...prod, quantity: prod.quantity || 1 });
            }
        });
        setCart(newCart);
        window.localStorage.setItem('cart', JSON.stringify(newCart));
        setSelectedProducts([]);
        addSelectedToCartAlert();
    };

    const increaseQuantityInCart = (id) => {
        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
        window.localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const decreaseQuantityInCart = (id) => {
        const updatedCart = cart.map((item) =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ).filter(item => item.quantity > 0);
        setCart(updatedCart);
        window.localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const fetchData = async () => {
        try {
            setError(null);
            setIsLoading(true);
            const data = await getAllProducts();
            setProducts(data.products);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <productsContext.Provider value={{
            products,
            isLoading,
            error,
            sortedMaxToMin,
            handleSort,
            minPrice,
            handleMinPrice,
            maxPrice,
            handleMaxPrice,
            search,
            handleSearch,
            category,
            handleCategory,
            cart,
            addToCart,
            removeFromCart,
            user,
            handleUser,
            addQuantity,
            restQuantity,
            cleanCart,
            iniciaSesionAlert,
            toggleSelectProduct,
            addSelectedToCart,
            selectedProducts,
            increaseQuantityInCart,
            decreaseQuantityInCart,
            productsNotSelectedAlert
        }}>
            {children}
        </productsContext.Provider>
    );
};
