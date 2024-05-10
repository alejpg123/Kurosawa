import { useContext } from "react";
import { productsContext } from "../context/ProductsContext";

function FilterByPrice() {
    const {maxPrice, handleMaxPrice, minPrice, handleMinPrice } = useContext(productsContext);
    return (
    <div>
        <p>Desde</p>
        <input type="text" 
        name="minPrice" 
        id="minPrice" 
        onChange={(e) => handleMinPrice(Number(e.target.value))}
        />
        <p>Hasta</p>
        <input type="text" 
        name="maxPrice" 
        id="maxPrice" 
        onChange={(a) => handleMaxPrice(Number(a.target.value))}
        />
        
    </div>
    )
}

export default FilterByPrice