import { useContext } from "react";
import { productsContext } from "../context/ProductsContext"
import { getDerivedCart } from "../utils/getDerivedCart"
import "./Cart.css"

function Cart() {
    const { cart, removeFromCart } = useContext(productsContext);
    const derivedCart = getDerivedCart(cart);
    
    return (
        <div className="divCart">
            {derivedCart.map((item) => (
                <div key={item.id}>
                    <button onClick={() => removeFromCart(item.id)}>Borrar</button>
                    <p>Producto: {item.name}, Cantidad: {item.quantity}, Precio: ${item.totalPrice}</p>
                </div>
            ))}
        </div>
    );
}

export default Cart