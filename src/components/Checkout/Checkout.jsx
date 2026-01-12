import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

function Checkout() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    const [promoDetails, setPromoDetails] = useState({
        deliveryPrice: 150,
        hasGift: false,
        appliedPromoName: ''
    });

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        payment: 'cash'
    });

    useEffect(() => {
        // 1. Загружаем корзину и выбранную ранее акцию
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const activePromo = JSON.parse(localStorage.getItem('activePromo') || 'null');
        setCart(savedCart);

        // 2. Считаем базовую сумму товаров
        const suma = savedCart.reduce((acc, item) => {
            const price = parseFloat(item.price?.toString().replace(/[^\d]/g, '')) || 0;
            return acc + (price * (item.qty || 1));
        }, 0);

        // 3. Логика акций по умолчанию
        let delivery = suma >= 1000 ? 0 : 150; 
        let gift = suma >= 1500; 
        let promoName = suma >= 1000 ? "Акция: Бесплатная доставка" : "";

        // 4. ПРИМЕНЕНИЕ СПЕЦИАЛЬНОЙ АКЦИИ (из раздела Promotions)
        if (activePromo && activePromo.promoConfig) {
            const config = activePromo.promoConfig;

            // Если акция на бесплатную доставку (например, KFC)
            if (config.type === 'FREE_DELIVERY' && suma >= config.minSum) {
                delivery = 0;
                promoName = `Акция ${activePromo.restaurant}: Доставка 0 сом!`;
            }

            // Если акция с подарком (например, Куликовский или Halal Burger)
            if (config.type === 'GIFT') {
                gift = true;
                promoName = `Подарок от ${activePromo.restaurant}: ${config.giftName}`;
            }

            // Если акция 1+1 или скидка (например, Мой Бургер или Point)
            if (config.type === 'DISCOUNT' || config.type === 'BOGO') {
                promoName = `Акция активна: ${activePromo.title}`;
                // Здесь можно добавить логику уменьшения цены suma, если нужно
            }
        }

        setTotal(suma + delivery);
        setPromoDetails({
            deliveryPrice: delivery,
            hasGift: gift,
            appliedPromoName: promoName
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
            alert("Пожалуйста, заполните все поля!");
            return;
        }

      
        localStorage.removeItem('cart');
        localStorage.removeItem('activePromo'); 
        
        window.dispatchEvent(new Event('cartUpdated')); 
        
        
        navigate('/order-success', { 
            state: { 
                name: formData.name, 
                total: total,
                gift: promoDetails.hasGift ? "Да" : "Нет"
            } 
        });
    };

    return (
        <div className="checkout-container">
            <h2>Оформление заказа</h2>
            
            <div className="checkout-content">
                <form onSubmit={handleSubmit} className="checkout-form" >
                    <h3>Ваши данные</h3>
                    <input 
                        type="text" 
                        placeholder="Имя" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required 
                    />
                    <input 
                        type="tel" 
                        placeholder="Номер телефона" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required 
                    />
                    <input 
                        type="text" 
                        placeholder="Адрес доставки" 
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        required 
                    />
                    
                    <h3>Способ оплаты</h3>
                    <select 
                        value={formData.payment}
                        onChange={(e) => setFormData({...formData, payment: e.target.value})}
                    >
                        <option value="cash">Наличными курьеру</option>
                        <option value="card">Картой онлайн</option>
                    </select>

                    <button type="submit" className="confirm-btn">
                        Подтвердить заказ
                    </button>
                </form>

                <div className="checkout-summary">
                    <h3>Ваш заказ</h3>
                    <div className="summary-items-list">
                        {cart.map(item => (
                            <div key={item.id} className="summary-item" style={{ marginBottom: '15px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                                    <span>{item.name} x {item.qty}</span>
                                    <span>{item.price} сом</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                  
                    <div className="promo-info-block" style={{ backgroundColor: '#1a2e1f', padding: '12px', borderRadius: '12px', marginTop: '15px', border: '1px solid #2f855a' }}>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#48bb78' }}>Примененные бонусы:</h4>
                        {promoDetails.appliedPromoName ? (
                            <div style={{ fontSize: '13px', color: '#48bb78', lineHeight: '1.4' }}>
                                <div>✅ {promoDetails.appliedPromoName}</div>
                                {promoDetails.hasGift && <div>🎁 Подарок включен в заказ!</div>}
                            </div>
                        ) : (
                            <div style={{ fontSize: '13px', color: '#888' }}>Нет активных акций</div>
                        )}
                    </div>

                    <div className="summary-total-details" style={{ marginTop: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Доставка:</span>
                            <span style={{ color: promoDetails.deliveryPrice === 0 ? '#48bb78' : '#fff', fontWeight: promoDetails.deliveryPrice === 0 ? 'bold' : 'normal' }}>
                                {promoDetails.deliveryPrice === 0 ? "БЕСПЛАТНО" : promoDetails.deliveryPrice + " сом"}
                            </span>
                        </div>
                        <hr style={{ border: 'none', borderTop: '1px dashed #333', margin: '15px 0' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <strong style={{ fontSize: '18px' }}>Итого к оплате:</strong>
                            <strong style={{ fontSize: '24px', color: '#fc8019' }}>{total} сом</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;