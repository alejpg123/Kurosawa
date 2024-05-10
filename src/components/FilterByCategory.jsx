import { useContext } from "react";
import { productsContext } from "../context/ProductsContext";

function FilterByCategory() {
    const {category, handleCategory } = useContext(productsContext);
    return (
        <>
        <div>
            <select
            onChange={(i) => handleCategory(i.target.value)}>
                <option value="all">Todas las categorías</option>
                <option value="Clothes">Ropa</option>
                <option value="Electronics">Electrónica</option>
                <option value="Shoes">Zapatos</option>
                <option value="Furniture">Hogar</option>
                <option value="Miscellaneous">Otros</option>
            </select>
        </div>
        </>
    )
}

export default FilterByCategory
