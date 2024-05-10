import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { productsContext } from "../context/ProductsContext";
import Product from "../components/Product";
import Sort from "../components/Sort";
import FilterByPrice from "../components/FilterByPrice";
import Search from "../components/Search"; 
import FilterByCategory from "../components/FilterByCategory";
import CartSummary from "../components/CartSummary"
import Sidebar from "../components/Sidebar"

function Products() {
    const {products, isLoading, error, maxPrice, search, minPrice, category} = useContext(productsContext);

    return (
        <>
            <Navbar />
            <Sidebar />
            <FilterByCategory />
        <h2>Listado de Productos</h2>
        {products.filter((prod) => 
        (minPrice === "" || prod.price >= minPrice) && 
        (maxPrice === "" || prod.price <= maxPrice) && 
        (category === "all" || prod.category.name === category) &&
        (search === "" || prod.title.toLocaleLowerCase().includes(search))
    )
    .map((prod) => (
        <Product key={prod.id} prod={prod} />
    ))
}
        </>
    )
}


export default Products