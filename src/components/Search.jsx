import  { useContext } from "react";
import { productsContext } from "../context/ProductsContext";
import "./Search.css"

function Search() {
    const { search, handleSearch } = useContext(productsContext);
    return (
        <div>
        <input className="search"
        type="text" 
        name="search" 
        id="searchTerm"
        placeholder="Buscador"
        label="search"
        onChange={(e) => handleSearch(e.target.value)}
        />
        </div>
    )
}

export default Search