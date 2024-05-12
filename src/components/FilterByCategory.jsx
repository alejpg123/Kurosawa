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
                <option value="smartphones">Celulares</option>
                <option value="laptops">Laptops</option>
                <option value="fragrances">Perfumes</option>
                <option value="skincare">Productos de belleza</option>
                <option value="home-decoration">Hogar</option>
                <option value="groceries">Otros</option>
            </select>
        </div>
        </>
    )
}

export default FilterByCategory
