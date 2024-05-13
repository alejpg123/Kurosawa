import { useContext } from "react";
import { productsContext } from "../context/ProductsContext"
import { getDerivedCart } from "../utils/getDerivedCart"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import "./Cart.css"

function Cart() {
    const { cart, removeFromCart } = useContext(productsContext);
    const derivedCart = getDerivedCart(cart);
    
    return (
        <>
        <Navbar />
        <Sidebar />
        
        <div className="divCart">
            {derivedCart.map((item) => (
                <div key={item.id}>
                    <button onClick={() => removeFromCart(item.id)}>Borrar</button>
                    <img src="{item.thumbnail}" alt="" /><p>Producto: {item.name}, Cantidad: {item.quantity}, Precio: ${item.totalPrice}</p>
                </div>
            ))}
        </div>
        </>
    );
}

export default Cart