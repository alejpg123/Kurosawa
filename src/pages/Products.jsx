import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { productsContext } from "../context/ProductsContext";
import Product from "../components/Product";
import FilterByCategory from "../components/FilterByCategory";
import Sidebar from "../components/Sidebar";

function Products() {
    const { products, isLoading, error, maxPrice, search, minPrice, category } = useContext(productsContext);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Navbar />
            <Sidebar />
            <FilterByCategory />
            <h2>Listado de Productos</h2>
            {products.filter((prod) =>
                (minPrice === "" || prod.price >= minPrice) &&
                (maxPrice === "" || prod.price <= maxPrice) &&
                (category === "all" || prod.category === category) &&
                (search === "" || prod.title.toLocaleLowerCase().includes(search))
            )
                .map((prod) => (
                    <Product key={prod.id} prod={prod} />
                ))}
        </>
    );
}

export default Products;