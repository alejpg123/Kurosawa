export const getTotalCartPrice = (cart) => {
    const totalPrice = cart.reduce((accum, curr) => accum + (curr.price * curr.quantity), 0);
    return totalPrice.toFixed(2);
}
