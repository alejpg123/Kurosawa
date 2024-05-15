import React, { useContext, useState } from 'react';
import { productsContext } from "../context/ProductsContext";
import { DomainVerification } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Categorias() {
    const { products, addToCart } = useContext(productsContext);
    const uniqueCategories = [];
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryDescripcion, setCategoryDescripcion] = useState("");
    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        setCategoryDescripcion( categoryId);
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
            <div className="Divisor">
              
            </div>
            <div className="Title">
                <h2 >Listado de Categorias</h2>
            </div>
            <div className="Divisor">
            </div>
            <>
                {uniqueCategories.map(item => (
                    <div key={item.id}>
                        <h2 className="LinesTitle">{item.category}</h2>
                        <div className="images">
                            <center>
                            <img 
                                src={item.thumbnail} 
                                alt={item.category} 
                                onClick={() => handleCategoryClick(item.category)}
                            />
                            </center>
                        </div>
                        <div className="Divisor">
                     </div>
                    </div>
                ))}
            </>
            <div className="Divisor">
            </div>
            <div className="Divisor">
            </div>
            <div className="Title">
                <h2 >Listado de productos por categoria {categoryDescripcion}</h2>
            </div>
            <div className="Divisor">
            </div>
            <div>
                  {products.filter((prod) => 
                    (prod.category === selectedCategory))
                     .map((product) => (
                        <div key={product.id}> 
                            <h3 className="LinesTitleProduct">{product.title}</h3>
                            <div className="images">
                                <center>
                                    <img src={product.thumbnail} alt={product.title} />
                                </center>
                            </div>
                            <div className="CenterDescriptionPart"> 
                                <p className="lines">{product.description.slice(0, 40)}...</p>
                                <div className="lines">
                                    <p>${product.price}</p>
                                    <button className="button" onClick={() => addToCart(product)}>Agregar al carrito</button>
                                </div>
                            </div>
                            <div className="Divisor">
                            </div>
                            <div className="Divisor">
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
    export default Categorias;