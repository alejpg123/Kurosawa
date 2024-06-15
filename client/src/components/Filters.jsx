import React, { useContext } from "react";
import { productsContext } from "../context/ProductsContext";
import FilterByCategory from "./FilterByCategory";
import FilterByPrice from "./FilterByPrice";
import Sort from "./Sort";

function Filters({ isSidebarOpen, setIsSidebarOpen }) {
    const { handleMinPrice, handleMaxPrice, handleCategory, handleSort } = useContext(productsContext);

    const resetFilters = () => {
        handleMinPrice("");
        handleMaxPrice(Infinity);
        handleCategory("all");
        handleSort(); 
    };

    return (
        <>
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
                    isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-3/4 lg:w-1/4 bg-white shadow-lg transform transition-transform z-50 ${
                    isSidebarOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="text-center relative p-4">
                    <button
                        className="absolute top-2 left-2 text-gray-500 hover:text-gray-700"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                    <FilterByCategory />
                    <FilterByPrice />
                    <Sort />
                    <div className="mt-4">
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-300"
                            onClick={resetFilters}
                        >
                            Quitar filtros
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Filters;
