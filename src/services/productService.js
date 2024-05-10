export const getAllProducts = async () => {
    const res = await fetch("https://api.escuelajs.co/api/v1/products");
    if(!res.ok) throw new Error("Response not ok");
    const data = await res.json();
    return data; 
}

/*https://api.escuelajs.co/api/v1/products*/
/*https://fakeapi.platzi.com/en/rest/products/*/


