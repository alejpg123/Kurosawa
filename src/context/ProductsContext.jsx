import React, { useEffect, useState, createContext } from "react";
import { getAllProducts, getCartFromStorage } from "../services/productService";
import { initialProduct } from "../services/initialProduct";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js"
export const productsContext = createContext([initialProduct]);

export const ProductsContextProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [ sortedMaxToMin, setSortedMaxToMin ] = useState(false)
    const [maxPrice, setMaxPrice] = useState(1000)
    const [minPrice, setMinPrice] = useState(0)
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("all")
    const [cart, setCart] = useState(getCartFromStorage())
    const [user, setUser] = useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.email);
            } 
        })
    }) 


    const handleSort = () => {
        if (sortedMaxToMin) {
            const sortedProducts = products.toSorted((a,b) => a.price - b.price);
            setProducts(sortedProducts);
        } else {
            const sortedProducts = products.toSorted((a,b) => b.price - a.price);
            setProducts(sortedProducts);
        }
        setSortedMaxToMin(!sortedMaxToMin);
    };
    const handleSearch = (search) => setSearch(search.toLocaleLowerCase())
    const handleMaxPrice = (priceMax)=> setMaxPrice(priceMax);
    const handleMinPrice = (priceMin)=> setMinPrice(priceMin);
    const handleCategory = (category)=> setCategory(category);
    const handleUser = (user) => setUser(user);
    const addToCart = (prod) => {
        setCart((prevValue) => [...prevValue, prod])
        const newCart = [...cart, prod];
        window.localStorage.setItem('cart', JSON.stringify(newCart))
    }
    const removeFromCart = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
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
            console.error(err)
            setError(err.message)
        }finally {
            setIsLoading(false);
        }
    }
    useEffect(()=> {
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
            handleUser
            }}>
            {children}
        </productsContext.Provider>
    )
};


