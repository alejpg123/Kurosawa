import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import { ProductsContextProvider } from './context/ProductsContext';
import Cart from "./components/Cart"
import Categorias from "./pages/Categorias";

function App() {


  return (
    <>
    <div className="MenuSyle">
      <BrowserRouter>
      <ProductsContextProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/categorias" element={<Categorias />}></Route>
        </Routes>
        </ProductsContextProvider>
      </BrowserRouter>
  </div>
  </>
  )
}

export default App
