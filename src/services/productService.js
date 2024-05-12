export const getAllProducts = async () => {
    const res = await fetch("https://dummyjson.com/products");
    if(!res.ok) throw new Error("Response not ok");
    const data = await res.json();
    return data; 
}

export const getCartFromStorage = () => {
    const storedCart = window.localStorage.getItem('cart')
    const parsedCart = JSON.parse(storedCart)
    return parsedCart
}

//https://fake-store-api.mock.beeceptor.com/api/products
//https://api.escuelajs.co/api/v1/products
//https://dummyjson.com/products