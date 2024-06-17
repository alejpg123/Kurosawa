import React, { useContext, useState } from "react";
import { productsContext } from "../context/ProductsContext";

function Product({ prod }) {
    const { user, addToCart, restQuantity, addQuantity, iniciaSesionAlert, toggleSelectProduct, selectedProducts } = useContext(productsContext);
    const isSelected = selectedProducts.some(p => p.id === prod.id);
    const [clicked, setClicked] = useState(false);

    const handleAddToCart = () => {
        if (user) {
            setClicked(true);
            addToCart(prod);
            setTimeout(() => {
                setClicked(false);
            }, 3000);
        } else {
            iniciaSesionAlert();
        }
    };

    return (
        <div 
            key={prod.id} 
            className={`relative w-80 bg-white shadow rounded m-4 transform transition-all duration-300 ${clicked ? 'bg-indigo-100 -translate-y-2 shadow-lg shadow-gray-400' : ''} hover:-translate-y-2 hover:shadow-lg hover:shadow-gray-400`}
            style={{ zIndex: 10 }}
        >
            <div
                className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
                style={{ backgroundImage: `url(${prod.thumbnail})` }}
            >
                <div className="flex justify-between">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectProduct({ ...prod, quantity: prod.quantity || 1 })}
                    />
                </div>
                <div>
                    <span className="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium select-none">
                        Disponible
                    </span>
                </div>
            </div>
            <div className="p-4 flex flex-col items-center">
                <p className="text-gray-400 font-light text-xs text-center">{prod.category}</p>
                <h1 className="text-gray-800 text-center mt-1">{prod.title}</h1>
                <p className="text-center text-gray-800 mt-1">${prod.price}</p>
                <div className="inline-flex items-center mt-2">
                    <button onClick={() => restQuantity(prod.id)}
                        className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex h-10 w-10 items-center justify-center text-xl">
                        -
                    </button>
                    <div className="bg-white h-10 w-10 border-t border-b text-gray-800 flex items-center justify-center text-sm">
                        {prod.quantity || 0}
                    </div>
                    <button onClick={() => addQuantity(prod.id)}
                        className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex h-10 w-10 items-center justify-center text-xl">
                        +
                    </button>
                </div>
                <button
                    onClick={handleAddToCart}
                    className={`h-10 px-6 py-2 mt-2 text-white font-semibold rounded-md ${clicked ? 'bg-custom-off-red' : 'bg-custom-coral hover:brightness-110'} transition-colors duration-300`}
                >
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
}

export default Product;
