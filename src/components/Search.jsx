import { useContext } from "react";
import { productsContext } from "../context/ProductsContext";
import { Link } from "react-router-dom";
import "./Search.css";

function Search() {
    const { handleSearch } = useContext(productsContext);


    return (
        <div className="Center">
          
            <Link to="/products" className="search-link">
            <input className="search"
            type="text" 
            name="search" 
            id="searchTerm"
            placeholder="Buscador"
            label="search"
            onChange={(e) => handleSearch(e.target.value)}
            />
            </Link>
        </div>
    )
}

export default Search