import React from 'react';
import { offers } from '../Restorant/RestorantData'; 
import './Offers.css';

const Offers = () => {
  
  const handleAddOffer = (offer) => {
    
    const cartItem = {
      ...offer,
      id: `offer-${offer.id}`, 
      price: offer.discount === "-100%" ? 0 : 0, 
      qty: 1,
      isOffer: true
    };

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    
   
    window.dispatchEvent(new Event('cartUpdated'));
    alert(`Акция "${offer.title}" добавлена!`);
  };

  return (
    <section className="offers-section">
      <h2 className="section-title">Все предложения от McDonald's</h2>
      <div className="offers-grid">
        {offers.map((offer) => (
          <div 
            key={offer.id} 
            className="offer-card" 
            style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%), url(${offer.img})` }}
          >
            
            <div className="offer-discount-badge">{offer.discount}</div>
            
            <div className="offer-content">
              <p className="offer-subtitle">Макдоналдс, Восточный Лондон</p>
              <h3 className="offer-title">{offer.title}</h3>
            </div>

           
            <button className="offer-plus-btn" onClick={() => handleAddOffer(offer)}>
              +
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Offers;