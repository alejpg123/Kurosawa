import { useContext } from "react";
import { productsContext } from "../context/ProductsContext";

function FilterByPrice() {
    const { maxPrice, handleMaxPrice, minPrice, handleMinPrice } = useContext(productsContext);

    return (
        <div>
            <p>Desde</p>
            <input
                type="text"
                name="minPrice"
                id="minPrice"
                value={minPrice === 0 ? '' : minPrice}
                onChange={(e) => handleMinPrice(e.target.value)}
            />
            <p>Hasta</p>
            <input
                type="text"
                name="maxPrice"
                id="maxPrice"
                value={maxPrice === Infinity ? '' : maxPrice}
                onChange={(e) => handleMaxPrice(e.target.value)}
            />
        </div>
    );
}

export default FilterByPrice;
