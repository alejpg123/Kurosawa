import { useContext, useState } from "react";
import { productsContext } from "../context/ProductsContext";
import { getDerivedCart } from "../utils/getDerivedCart";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getTotalCartPrice } from "../utils/getTotalCartPrice";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from "axios";
import Whatsapp from "./Whatsapp";

function Cart() {
    const { user, cart, removeFromCart, cleanCart, increaseQuantityInCart, decreaseQuantityInCart } = useContext(productsContext);
    const derivedCart = getDerivedCart(cart);
    const [preferenceId, setPreferenceId] = useState(null);
    initMercadoPago('TEST-e6a32048-f31a-4eea-9bd3-4a45b8a53d21', {
        locale: "es-AR",
    });

    const createPreference = async () => {
        try {
            const response = await axios.post("http://localhost:3000/create_preference", {
                title: "Kurosawa",
                quantity: 1,
                price: getTotalCartPrice(cart)
            });
            const { id } = response.data;
            return id;
        } catch (error) {
            console.log(error);
        }
    };

    const handleBuy = async () => {
        const id = await createPreference();
        if (id) {
            setPreferenceId(id);
        }
    };

    return (
        <div className="flex flex-col min-h-screen text-center">
            <Navbar />
            <div className="flex-1 container mx-auto p-4">
                <h2 className="text-4xl font-bold mb-4 text-center text-black">MI CARRITO</h2>
                <div>
                    {user ? (
                        <div>
                            {derivedCart.length > 0 ? (
                                <>
                                    {derivedCart.map((item) => (
                                        <div key={item.id} className="flex flex-col items-center p-4 mb-4 bg-white rounded-lg shadow-md text-center">
                                            <img className="w-24 h-24 object-cover mb-4" src={item.thumbnail} alt={item.name} />
                                            <div className="flex-1 space-y-2">
                                                <p className="font-semibold">Producto: {item.name}</p>
                                                <p>Cantidad: {item.quantity}</p>
                                                <p>Precio: ${item.totalPrice.toFixed(2)}</p>
                                            </div>
                                            <div className="flex space-x-2 mt-2">
                                                <button className="px-2 py-1 bg-custom-off-red hover:brightness-110 text-white rounded" onClick={() => removeFromCart(item.id)}>Borrar</button>
                                                <button className="px-2 py-1 bg-custom-blue-gray hover:brightness-110 text-white rounded" onClick={() => increaseQuantityInCart(item.id)}>+</button>
                                                <button className="px-2 py-1 bg-custom-blue-gray hover:brightness-110 text-white rounded" onClick={() => decreaseQuantityInCart(item.id)}>-</button>
                                            </div>
                                        </div>
                                    ))}
                                    <p className="font-semibold text-2xl">Total carrito: ${getTotalCartPrice(cart)}</p>
                                    <button className="px-4 py-2 bg-custom-dark-green hover:brightness-110 text-white rounded mt-4 m-2" onClick={handleBuy}>Realizar compra</button>
                                    {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
                                    <button className="px-4 py-2 bg-custom-off-red hover:brightness-110 text-white rounded mt-4 m-2" onClick={cleanCart}>Vaciar carrito</button>
                                </>
                            ) : (
                                <>
                                    <p className="text-2xl font-semibold mb-14 mt-14 ">Tu carrito está vacío.</p>
                                    <NavLink to="/products">
                                        <button className="px-4 py-2 bg-custom-green-yellow hover:brightness-110 text-white rounded">¡Comienza a comprar!</button>
                                    </NavLink>
                                </>
                            )}
                        </div>
                    ) : (
                        <NavLink to="/"><p>Inicia sesión para agregar productos a tu carrito.</p></NavLink>
                    )}
                </div>
            </div>
            <Footer className="mt-auto" />
            <Whatsapp />
        </div>
    );
}

export default Cart;
