import React, { useContext } from "react";
import { productsContext } from "../context/ProductsContext";

function FilterByCategory() {
    const { category, handleCategory } = useContext(productsContext);

    return (
        <div className="mb-4 mt-10">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Filtrar por Categoría:</label>
            <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => handleCategory(e.target.value)}
                className="w-60 text-center border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
                <option value="all">Todas las categorías</option>
                <option value="fragrances">Perfumes</option>
                <option value="beauty">Productos de belleza</option>
                <option value="furniture">Hogar</option>
                <option value="groceries">Alimentos</option>
            </select>
        </div>
    );
}

export default FilterByCategory;
