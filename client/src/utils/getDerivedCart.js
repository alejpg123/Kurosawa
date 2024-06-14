export const getDerivedCart = (cart) => {
    const derivedCart = []
    cart.forEach(item => {
        const existingItem = derivedCart.find(dItem => dItem.id === item.id)
        if (existingItem) {
            existingItem.quantity += item.quantity;
            existingItem.totalPrice = existingItem.quantity * item.price;  
        } else {
            derivedCart.push({
                id: item.id,
                thumbnail: item.thumbnail,
                name: item.title,
                quantity: item.quantity,
                totalPrice: item.price * item.quantity,
            });
        }
    });

    return derivedCart;
}
