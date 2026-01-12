import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../header/Header'
import Footer from '../footer/Footer';
import DeliveryModal from '../DeliveryModal/DeliveryModal';
function Layout({ cartItems, removeFromCart, totalPrice }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

 
  const openDelivery = () => setIsModalOpen(true);
  return (
    <div>
      <Header onOpenDelivery={openDelivery}/>
      <Outlet/>
      <Footer/>
      
    </div>
  )
}

export default Layout
   