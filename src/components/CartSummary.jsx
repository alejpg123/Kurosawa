import { useContext } from "react"
import { productsContext } from "../context/ProductsContext"
import { MdShoppingCart }  from "react-icons/md"
import { Link } from "react-router-dom";
import { getTotalCartPrice } from "../utils/getTotalCartPrice"

function CartSummary() {
    const { cart } = useContext(productsContext);
    return (
        <>
    <Link to="/cart">
    <MdShoppingCart />
    </Link>
    <span>Cant:{cart.length}
    Total: ${getTotalCartPrice(cart)}</span>
    </>
    );
}

export default CartSummary