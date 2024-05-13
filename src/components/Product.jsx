import { useContext } from "react";
import { productsContext } from "../context/ProductsContext";
import  './Product.css'

function Product({ prod }) {
    const { addToCart } = useContext(productsContext);
    return (
    <div key={prod.id}> 
        <h3 className="lines">{prod.title}</h3>
        <div className="images">
            <center>
            <img src={prod.thumbnail} alt={prod.title} />
            </center>
        </div>
        <div className="lines">
            <p>${prod.price}</p>
            <button onClick={() => addToCart(prod)}>Agregar al carrito</button>
        </div>
        <p className="lines">{prod.description.slice(0, 40)}...</p>
        <div className="Divisor">
        </div>
        <div className="Divisor">
        </div>
    </div>
    
    );
}

export default Product;