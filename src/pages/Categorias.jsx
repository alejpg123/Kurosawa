import React, { useContext, useState } from 'react';
import { productsContext } from "../context/ProductsContext";
import { DomainVerification } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Categorias() {
    const { products, addToCart } = useContext(productsContext);
    const uniqueCategories = [];
    const [selectedCategory, setSelectedCategory] = useState(null);
    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    products.forEach(product => {
        const isUnique = !uniqueCategories.some(item => item.category === product.category);
        if (isUnique) {
            uniqueCategories.push(product);
        }
    });

    return (
        <div>
        <Navbar />
        <Sidebar/> 
        
            <>
                {uniqueCategories.map(item => (
                    <div key={item.id}>
                        <h2>{item.category}</h2>
                        <img 
                            src={item.thumbnail} 
                            alt={item.category} 
                            onClick={() => handleCategoryClick(item.category)}
                        />
                    </div>
                ))}
            </>
    
            <div>
                  {products.filter((prod) => 
                    (prod.category === selectedCategory))
                     .map((product) => (
                        <div key={product.id}> 
                        <h3>{product.title}</h3>
                        <div>
                        <img src={product.thumbnail} alt={product.title}/>
                        <p>${product.price}</p>
                        <button onClick={() => addToCart(product)}>Agregar al carrito</button>
                        </div>
                    <p>{product.description.slice(0, 40)}...</p>
                    </div>
                    ))}
            </div>
        </div>
    );
}
    export default Categorias;