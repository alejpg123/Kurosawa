import { useContext } from "react";
import { productsContext } from "../context/ProductsContext";
import { Link } from "react-router-dom";

function Search() {
    const { handleSearch } = useContext(productsContext);


    return (
            <Link to="/products">
            <input className="bg-white border-solid border-gray-50 text-black text-center rounded-md"
            type="text"
            name="search" 
            id="searchTerm"
            placeholder="Buscador"
            label="search"
            onChange={(e) => handleSearch(e.target.value)}
            />
            </Link>

    )
}

export default Search