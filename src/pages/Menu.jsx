import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Menu.css';

const Menu = ({ onAddToCart }) => {
    const location = useLocation();
    const navigate = useNavigate();

   
    const [allItems, setAllItems] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); 
    const [activeFilter, setActiveFilter] = useState(location.state?.filter || 'all');
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

  
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch('https://69287044b35b4ffc5015b057.mockapi.io/myAPI');
                const data = await response.json();
                setAllItems(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Ошибка при загрузке меню:", error);
                setIsLoading(false);
            }
        };

        fetchMenu();
    }, []);

   
    useEffect(() => {
        const syncCart = () => {
            const savedCart = localStorage.getItem('cart');
            setCart(savedCart ? JSON.parse(savedCart) : []);
        };
        window.addEventListener('cartUpdated', syncCart);
        return () => window.removeEventListener('cartUpdated', syncCart);
    }, []);

    
    const cartTotal = cart.reduce((sum, item) => {
        const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
        return sum + (price * (item.qty || 1));
    }, 0);
    
    const neededSum = 1000;
  
    const isPromoEligible = true; 
    const isDeliveryFree = cartTotal >= neededSum;

  
    const handleAddClick = (product) => {
        const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItemIndex = currentCart.findIndex(item => item.id === product.id);

        if (existingItemIndex > -1) {
            currentCart[existingItemIndex].qty = (currentCart[existingItemIndex].qty || 1) + 1;
        } else {
            currentCart.push({ ...product, qty: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(currentCart));
        setCart(currentCart);
        window.dispatchEvent(new Event('cartUpdated'));

        if (onAddToCart) {
            onAddToCart(product);
        }
    };

    const filteredItems = activeFilter === 'all' 
        ? allItems 
        : allItems.filter(item => item.restaurantName === activeFilter);

    const restaurants = ["Kulikov", "KFC", "Halal-Burger", "Woklagman", "Point", "Мой бургер"];

    if (isLoading) {
        return <div className="loading">Загрузка вкусняшек...</div>;
    }

    return (
        <div className="menu-page">
            <div className="menu-container">
                
                {/* ОБЩИЙ БАННЕР ДОСТАВКИ */}
                {isPromoEligible && (
                    <div className="promo-progress-banner">
                        <h3>Акция: Бесплатная доставка</h3>
                        <p>{isDeliveryFree 
                            ? "✅ Условие выполнено! Доставка 0 сом" 
                            : `Сделайте заказ на ${neededSum} сом и доставка будет бесплатно. Осталось: ${neededSum - cartTotal} сом`}
                        </p>
                        <div className="progress-bar-bg">
                            <div 
                                className="progress-bar-fill" 
                                style={{ 
                                    width: `${Math.min((cartTotal / neededSum) * 100, 100)}%`,
                                    transition: 'width 0.3s ease-in-out',
                                    backgroundColor: isDeliveryFree ? '#4CAF50' : '#ff9800'
                                }}
                            ></div>
                        </div>
                    </div>
                )}

                <h1 className="menu-title">Меню {activeFilter !== 'all' ? `(${activeFilter})` : ''}</h1>

                <div className="filter-bar">
                    <button 
                        className={activeFilter === 'all' ? 'filter-btn active' : 'filter-btn'}
                        onClick={() => setActiveFilter('all')}
                    >Все</button>
                    {restaurants.map(name => (
                        <button 
                            key={name}
                            className={activeFilter === name ? 'filter-btn active' : 'filter-btn'}
                            onClick={() => setActiveFilter(name)}
                        >{name}</button>
                    ))}
                </div>

                <div className="food-grid">
                    {filteredItems.map(item => (
                        <div key={item.id} className="food-card">
                            <div className="res-tag">
                                {item.restaurantName || "Заведение"}
                            </div>
                            
                            <div className="food-image-container">
                                <img src={item.avatar || item.img} alt={item.name} />
                            </div>
                            
                            <div className="food-info">
                                <h3>{item.name}</h3>
                                <p>{item.title}</p>
                                
                                <div className="food-price-row">
                                    <span className="food-price">{item.price} с</span>
                                    <button 
                                        className="add-to-cart" 
                                        onClick={() => handleAddClick(item)}
                                    >+</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Menu;