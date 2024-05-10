import { useContext } from "react";
import { productsContext } from "../context/ProductsContext";

function Product({ prod }) {
    const { addToCart } = useContext(productsContext);
    return (
    <div key={prod.id}> 
        <h3>{prod.title}</h3>
        <div>
        <img src={prod.images} alt={prod.title}/>
        <p>${prod.price}</p>
        <button onClick={() => addToCart(prod)}>Agregar al carrito</button>
        </div>
    <p>{prod.description.slice(0, 40)}...</p>
    </div>
    );
}

export default Product;