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
        <div className="Divisor">
        </div>
        <div className="Title">
            <h2 >Mi carrito</h2>
        </div>
        <div className="Divisor">
        </div>
        <div  >
            {derivedCart.map((item) => (
                <div key={item.id}>

                    <img src={item.thumbnail} alt={item.title} />
                    <p>Producto: {item.name}, Cantidad: {item.quantity}, Precio: ${item.totalPrice}</p>
                    <button className="button" onClick={() => removeFromCart(item.id)}>Borrar</button>
                    <div className="Divisor">
                    </div>
                </div>
            ))}
        </div>
        <div className="Divisor">
        </div>
        <div className="Divisor">
        </div>
        </>
    );
}

export default Cart