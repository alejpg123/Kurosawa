import React, { useContext } from "react";
import { productsContext } from "../context/ProductsContext";

function FilterByPrice() {
    const { maxPrice, handleMaxPrice, minPrice, handleMinPrice } = useContext(productsContext);

    return (
        <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Filtrar por precio:</label>
            <div className="mb-2">
                <p className="mb-1">Desde</p>
                <input
                    type="text"
                    name="minPrice"
                    id="minPrice"
                    value={minPrice === 0 ? '' : minPrice}
                    onChange={(e) => handleMinPrice(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
                />
            </div>
            <div>
                <p className="mb-1">Hasta</p>
                <input
                    type="text"
                    name="maxPrice"
                    id="maxPrice"
                    value={maxPrice === Infinity ? '' : maxPrice}
                    onChange={(e) => handleMaxPrice(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
                />
            </div>
        </div>
    );
}

export default FilterByPrice;
