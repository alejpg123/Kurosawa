import { useContext } from "react";
import { productsContext } from "../context/ProductsContext";

function FilterByCategory() {
    const {category, handleCategory } = useContext(productsContext);
    return (
        <>
        <div>
            <select
            onChange={(e) => handleCategory(e.target.value)}>
                <option value="all">Todas las categorías</option>
                <option value="fragrances">Perfumes</option>
                <option value="beauty">Productos de belleza</option>
                <option value="furniture">Hogar</option>
                <option value="groceries">Alimentos</option>
            </select>
        </div>
        </>
    )
}

export default FilterByCategory
