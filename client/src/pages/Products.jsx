import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { productsContext } from "../context/ProductsContext";
import Product from "../components/Product";
import Filters from "../components/Filters";
import AddSelectedProductsButton from "../components/AddSelectedProductsButton";
import Footer from "../components/Footer";

function Products() {
    const {
        products,
        isLoading,
        error,
        maxPrice,
        search,
        minPrice,
        category
    } = useContext(productsContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const filteredProducts = products.filter(
        (prod) =>
            (minPrice === 0 || prod.price >= minPrice) &&
            (maxPrice === Infinity || prod.price <= maxPrice) &&
            (category === "all" || prod.category === category) &&
            (search === "" || prod.title.toLowerCase().includes(search))
    );

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-col items-center justify-center flex-1 container mx-auto p-4">
                <h2 className="text-2xl font-semibold mb-4">Listado de Productos</h2>
                <div className="flex justify-center mb-4">
                    <div className="max-w-screen-lg w-full px-4">
                        <div className="flex justify-end mb-4">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={() => setIsSidebarOpen(true)}
                            >
                                Filtrar por
                            </button>
                        </div>
                        <div className="relative">
                            <Filters isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                                {filteredProducts.map((prod) => (
                                    <Product key={prod.id} prod={prod} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <div className="max-w-screen-lg w-full">
                        <AddSelectedProductsButton />
                    </div>
                </div>
            </div>
            <Footer className="mt-auto" />
        </div>
    );
}

export default Products;
