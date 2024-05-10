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
        const isUnique = !uniqueCategories.some(item => item.category.id === product.category.id);
        if (isUnique) {
            uniqueCategories.push(product);
        }
    });

    /* la idea es que se clickee en la imagen y renderice los productos de esa categoría*/
    return (
        <div>
        <Navbar />
        <Sidebar/> 
        
            <>
                {uniqueCategories.map(item => (
                    <div key={item.category.id}>
                        <h2>{item.category.name}</h2>
                        <img 
                            src={item.category.image} 
                            alt={item.category.name} 
                            onClick={() => handleCategoryClick(item.category.id)}
                        />
                    </div>
                ))}
            </>
    
            <div>
                  {products.filter((prod) => 
                    (prod.category.id === selectedCategory))
                     .map((product) => (
                        <div key={product.id}> 
                        <h3>{product.title}</h3>
                        <div>
                        <img src={product.images} alt={product.title}/>
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