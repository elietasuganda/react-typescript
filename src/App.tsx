import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
import './index.css';
import Cart from './components/Cart';

const App = () => {
  const [cart, setCart] = useState<any[]>([]);  // Menyimpan produk yang ada di keranjang

  const addToCart = (product: any) => {
    setCart([...cart, product]);  // Menambahkan produk ke keranjang
  };
 
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/products" element={<Products />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/cart" element={<Cart cart={cart} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;