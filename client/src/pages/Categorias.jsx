import React, { useContext, useState, useRef, useEffect } from 'react';
import { productsContext } from "../context/ProductsContext";
import Navbar from '../components/Navbar';
import AddSelectedProductsButton from '../components/AddSelectedProductsButton';
import Footer from "../components/Footer.jsx";

function Categorias() {
    const { user, products, addToCart, iniciaSesionAlert, addSelectedToCart, toggleSelectProduct, selectedProducts, addQuantity, restQuantity } = useContext(productsContext);
    const uniqueCategories = [];
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryDescripcion, setCategoryDescripcion] = useState("");
    const [clickedProduct, setClickedProduct] = useState(null);

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        setCategoryDescripcion(categoryId);
    };

    const productsRef = useRef(null);

    products.forEach(product => {
        const isUnique = !uniqueCategories.some(item => item.category === product.category);
        if (isUnique) {
            uniqueCategories.push(product);
        }
    });

    useEffect(() => {
        if (productsRef.current) {
            productsRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [selectedCategory]);

    const handleAddToCart = (product) => {
        if (user) {
            setClickedProduct(product.id);
            addToCart(product);
            setTimeout(() => {
                setClickedProduct(null);
            }, 3000);
        } else {
            iniciaSesionAlert();
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-col items-center justify-center flex-1 container mx-auto p-4">
                <h2 className="text-4xl font-bold mb-4 text-center text-black">LISTADO DE CATEGORIAS</h2>
                <div className="flex gap-3 justify-center overflow-x-auto whitespace-nowrap py-4">
                    {uniqueCategories.map(item => (
                        <div
                            key={item.id}
                            className={`p-4 border rounded ${selectedCategory === item.category ? 'bg-blue-100' : 'bg-white'} flex-shrink-0`}
                            onClick={() => handleCategoryClick(item.category)}
                        >
                            <h2 className="text-2xl font-semibold mb-4 text-center">{item.category}</h2>
                            <div className="images">
                                <center>
                                    <img
                                        src={item.thumbnail}
                                        alt={item.category}
                                        className="h-24 w-24 object-cover"
                                    />
                                </center>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="Title text-center mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Listado de productos por categoría {categoryDescripcion}</h2>
                </div>
                <div ref={productsRef}></div>
                <div className="flex justify-center mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-screen-lg">
                        {products.filter((prod) => (prod.category === selectedCategory)).map((product) => {
                            const isSelected = selectedProducts.some(p => p.id === product.id);
                            const isClicked = clickedProduct === product.id;
                            return (
                                <div
                                    key={product.id}
                                    className={`w-80 bg-white shadow rounded m-4 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-gray-400 ${isClicked ? 'bg-indigo-200' : ''}`}
                                >
                                    <div
                                        className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${product.thumbnail})` }}
                                    >
                                        <div className="flex justify-between">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => toggleSelectProduct(product)}
                                            />
                                        </div>
                                        <div>
                                            <span className="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium select-none">
                                                Disponible
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 flex flex-col items-center">
                                        <p className="text-gray-400 font-light text-xs text-center">{product.category}</p>
                                        <h1 className="text-gray-800 text-center mt-1">{product.title}</h1>
                                        <p className="text-center text-gray-800 mt-1">${product.price}</p>
                                        <div className="inline-flex items-center mt-2">
                                            <button onClick={() => restQuantity(product.id)}
                                                className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M20 12H4"
                                                    />
                                                </svg>
                                            </button>
                                            <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
                                                {product.quantity}
                                            </div>
                                            <button onClick={() => addQuantity(product.id)}
                                                className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 4v16m8-8H4"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center"
                                        >
                                            Agregar al carrito
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 ml-2"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="mt-4">
                    <AddSelectedProductsButton />
                </div>
            </div>
            <Footer className="mt-auto" />
        </div>
    );
}

export default Categorias;
