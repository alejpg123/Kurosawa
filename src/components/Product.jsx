import { useContext } from "react";
import { productsContext } from "../context/ProductsContext";
import  './Product.css'

function Product({ prod }) {
    const { addToCart } = useContext(productsContext);
    return (
    <div key={prod.id}> 
        <h3 className="LinesTitle">{prod.title}</h3>
        <div className="images">
            <center>
                <img src={prod.thumbnail} alt={prod.title} />
            </center>
        </div>

        <div className="CenterDescriptionPart"> 
            <p className="lines">{prod.description.slice(0, 40)}...</p>
            <div className="lines">
                <p>${prod.price}</p>
                <button className="button" onClick={() => addToCart(prod)}>Agregar al carrito</button>
            </div>
        </div>
        <div className="Divisor">
        </div>
        <div className="Divisor">
        </div>
    </div>
    
    );
}

export default Product;