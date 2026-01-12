import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Korzina() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const increaseQty = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
    );
    updateCart(updatedCart);
  };

  const decreaseQty = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, qty: Math.max(1, (item.qty || 1) - 1) } : item
    );
    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    updateCart(updatedCart);
  };

  // Вынес парсинг цены в отдельную функцию, чтобы код был чище
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    return parseFloat(priceStr.toString().replace('сом', '').replace(' ', '')) || 0;
  };

  const getTotal = () => {
    return cart.reduce((total, item) => {
      return total + parsePrice(item.price) * (item.qty || 1);
    }, 0);
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Корзина</h1>
        <button className="back-link" onClick={() => navigate('/')}>← Вернуться в меню</button>
      </div>

      {cart.length === 0 ? (
        <div className="empty-message">
          <p>Корзина пуста. Самое время добавить что-нибудь вкусное!</p>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.img} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <div className="item-main-details">
                    <h3>{item.name}</h3>
                    <p className="item-desc">{item.description}</p>
                    <p className="item-price">Цена: {item.price}</p>
                  </div>
                  
                  <div className="cart-controls-row">
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => decreaseQty(item.id)}>−</button>
                      <span className="qty-number">{item.qty || 1}</span>
                      <button className="qty-btn" onClick={() => increaseQty(item.id)}>+</button>
                    </div>
                    <button className="delete-item-btn" onClick={() => removeItem(item.id)}>Удалить</button>
                  </div>
                  
                  <p className="item-subtotal">
                    Итого: {parsePrice(item.price) * (item.qty || 1)} сом
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-details">
              <h2>Общий итог:</h2>
              <span className="total-amount">{getTotal()} сом</span>
            </div>
            <button className="checkout-btn" onClick={() => navigate('/checkout')}>
              Оформить заказ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Korzina;