import React, { useContext, useEffect } from "react";
import { productsContext } from "../context/ProductsContext";
import FilterByCategory from "./FilterByCategory";
import FilterByPrice from "./FilterByPrice";
import Sort from "./Sort";

function Filters({ isSidebarOpen, setIsSidebarOpen }) {
    const { handleMinPrice, handleMaxPrice, handleCategory, handleSort } = useContext(productsContext);

    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isSidebarOpen]);

    const resetFilters = () => {
        handleMinPrice("");
        handleMaxPrice(Infinity);
        handleCategory("all");
        handleSort();
    };

    const handleOverlayClick = (e) => {
        if (e.target.id === 'overlay') {
            setIsSidebarOpen(false);
        }
    };

    return (
        <>
            {isSidebarOpen && (
                <>
                    <div
                        id="overlay"
                        className="fixed inset-0 bg-black bg-opacity-50 z-10"
                        onClick={handleOverlayClick}
                    ></div>
                    <div className="fixed top-0 right-0 h-full bg-white shadow-lg z-20 p-5 w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 transition-transform transform translate-x-0">
                        <div className="flex flex-col justify-between h-full text-black">
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
                    </div>
                </>
            )}
        </>
    );
}

export default Filters;
