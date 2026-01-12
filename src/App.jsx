import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Restorant from './pages/Restorant/Restorant';

import Checkout from './components/Checkout/Checkout';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Promotions from './components/Promotions/Promotions';
import About from './components/About/About';
import Questions from './components/Questions/Questions';
import Menu from './pages/Menu';
import Header from './components/header/Header';
import Sugnup from './components/sugnup-us/Sugnup';
import Reviews from './components/Reviews/Reviews';
import OrderSuccess from './components/OrderSuccess/OrderSuccess';
import Terms from './components/Terms/Terms';
import Prices from './components/Prices/Prices';
import Sitemap from './components/Sitemap/Sitemap';


function App() {
  // 1. Создаем единое состояние корзины
    const [cartItems, setCartItems] = useState([]);

    // 2. Функция добавления товара (эту функцию мы отдадим в Меню)
    const addToCart = (product) => {
        setCartItems((prev) => [...prev, product]);
    };

    // 3. Функция удаления (эту отдадим в Хедер)
    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter(item => item.id !== id));
    };

    // Расчет данных для хедера
    const cartData = {
        count: cartItems.length,
        total: cartItems.reduce((sum, item) => sum + item.price, 0)
    };
  return (
  
    <BrowserRouter>
      {/* <Header items={cartItems} 
                cartData={cartData} 
                removeFromHeader={removeFromCart}/> */}
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* index означает, что Home откроется сразу при заходе на сайт */}
          <Route index element={<Home />} /> 
          <Route path='/signup-partner' element={<Sugnup initialRole="partner"/>}/>
          <Route path='/signup-courier' element={<Sugnup initialRole="courier"/>}/>
          {/* Убрали лишние слеши в начале вложенных путей */}
           <Route path="/restaurant" element={<Menu onAddToCart={addToCart}/>}/>
          <Route path='home' element={<Home />} />
          <Route path='restaurant/:slug' element={<Restorant />} />
          <Route path='product/:id' element={<ProductDetail />} />
        
          <Route path='checkout' element={<Checkout />} />
          <Route path='promotions' element={<Promotions />} />
          <Route path='about' element={<About />} />
          <Route path='faq' element={<Questions />} />
          <Route path='/about-us' element={<Questions/>}/>
          <Route path='/support' element={<Questions/>}/>
          <Route path="/all-reviews" element={<Reviews/>}/>
           <Route path='/order-success' element={<OrderSuccess/>}/>
           <Route path='/terms' element={<Terms/>}/>
           <Route path='/prices' element={<Prices/>}/>
           <Route path='/sitemap' element={<Sitemap/>}/>
        </Route>

        {/* Если юзер ввел ерунду, кидаем его на главную */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App