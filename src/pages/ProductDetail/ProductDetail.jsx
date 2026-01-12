import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { restaurantList } from '../Restorant/RestorantData'; 
import SpecialRequestModal from '../SpecialRequestModal/SpecialRequestModal'; 
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [qty, setQty] = useState(1);
  const [isExtraModalOpen, setIsExtraModalOpen] = useState(false);
  const [specialRequest, setSpecialRequest] = useState("");


  const allProducts = restaurantList.flatMap(res => res.items);

  const product = allProducts.find(item => String(item.id) === String(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Товар не найден</h2>;

  const availableToppings = product.toppings || [];


  const basePrice = parseInt(product.price.toString().replace(/[^\d]/g, '')) || 0;
  const toppingsPrice = selectedToppings.reduce((total, t) => total + t.price, 0);
  const singleItemPrice = basePrice + toppingsPrice;
  const totalPrice = singleItemPrice * qty;

  const handleToppingChange = (topping) => {
    if (selectedToppings.find(t => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter(t => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const increment = () => setQty(prev => prev + 1);
  const decrement = () => {
    if (qty > 1) setQty(prev => prev - 1);
  };

  const onAdd = () => {
    const productToCart = {
      ...product,
      id: Date.now(),
      originalId: product.id,
      price: singleItemPrice,
      qty: qty,
      selectedToppings: selectedToppings.map(t => t.name).join(', '),
      comment: specialRequest 
    };

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(productToCart);
    localStorage.setItem('cart', JSON.stringify(cart));

    window.dispatchEvent(new Event('cartUpdated'));
    alert(`Добавлено в корзину!`);
  };

  const handleSaveRequest = (product, comment) => {
    setSpecialRequest(comment);
    setIsExtraModalOpen(false);
  };

  return (
    <div className="product-detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Назад</button>
      
      <div className="product-main-info">
        <div className="product-image-large">
          <img src={product.img} alt={product.name} />
        </div>
        
        <div className="product-text-info">
          <h1>{product.name}</h1>
          <p className="product-description">{product.description || "Описание скоро появится"}</p>
          
          {availableToppings.length > 0 ? (
            <div className="customization-section">
              <h3>Добавить в заказ:</h3>
              <div className="toppings-list">
                {availableToppings.map(topping => (
                  <label key={topping.id} className="topping-item">
                    <input 
                      type="checkbox" 
                      onChange={() => handleToppingChange(topping)}
                      checked={!!selectedToppings.find(t => t.id === topping.id)}
                    />
                    <span className="topping-name">{topping.name}</span>
                    <span className="topping-price">+{topping.price} сом</span>
                  </label>
                ))}
              </div>
            </div>
          ) : ( 
            <p className="no-toppings-msg">Для этого товара нет доступных добавок.</p>
          )}

          <div className="extra-options-container" style={{marginTop: '20px'}}>
            <button 
                className="open-requests-btn" 
                onClick={() => setIsExtraModalOpen(true)}
                style={{
                  background: 'none', 
                  border: '1px dashed #fc8019', 
                  color: '#fc8019',
                  padding: '10px',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
            >
                {specialRequest ? "✅ Пожелание сохранено" : "+ Добавить особое пожелание"}
            </button>
            {specialRequest && (
                <p style={{fontSize: '12px', color: '#666', marginTop: '5px'}}>
                  Ваш текст: "{specialRequest}"
                </p>
            )}
          </div>
        </div>
      </div>

      <div className="order-action-bar">
        <div className="total-price-display">
          Итого: <span>{totalPrice} сом</span>
        </div>

        <div className="action-right-side" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div className="qty-selector" style={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: '30px', padding: '10px 20px', gap: '15px', border: '1px solid orange' }}>
            <button onClick={decrement} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
            <span style={{ fontSize: '18px', fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{qty}</span>
            <button onClick={increment} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
          </div>

          <button className="add-to-cart-large" onClick={onAdd}>
            Добавить за {totalPrice} сом
          </button>
        </div>
      </div>

      <SpecialRequestModal 
        isOpen={isExtraModalOpen} 
        product={product} 
        onClose={() => setIsExtraModalOpen(false)} 
        onAdd={handleSaveRequest} 
      />
    </div>
  );
}

export default ProductDetail;