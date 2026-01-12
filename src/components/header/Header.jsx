import React, { useEffect, useState } from 'react'
import './Header.css'
import { useNavigate, NavLink } from 'react-router-dom';
import log from '../../assets/login.png'
import { FaLocationDot, FaArrowRightToBracket } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa"; 
import { GrBasket } from "react-icons/gr";

function Header({ onOpenDelivery }) {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const [cartData, setCartData] = useState({ count: 0, total: 0 });
    const [items, setItems] = useState([]);

    const calculateCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setItems(cart);
        const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
        const total = cart.reduce((sum, item) => {
            const rawPrice = item.price || 0;
            const price = typeof rawPrice === 'string' 
                ? parseFloat(rawPrice.replace(/[^\d.]/g, '')) 
                : parseFloat(rawPrice);
            return sum + (price * (item.qty || 1));
        }, 0);
        setCartData({ count, total });
    };

    useEffect(() => {
        calculateCart();
        const savedUser = localStorage.getItem('userEmail');
        if (savedUser) setUser(savedUser);

        window.addEventListener('cartUpdated', calculateCart);
        return () => window.removeEventListener('cartUpdated', calculateCart);
    }, []);

    // ФУНКЦИИ ИЗМЕНЕНИЯ КОЛИЧЕСТВА
    const updateCartInStorage = (newCart) => {
        localStorage.setItem('cart', JSON.stringify(newCart));
        calculateCart();
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const increaseQty = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const updated = cart.map(item => 
            item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
        );
        updateCartInStorage(updated);
    };

    const decreaseQty = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const updated = cart.map(item => {
            if (item.id === id) {
                const newQty = (item.qty || 1) - 1;
                return newQty > 0 ? { ...item, qty: newQty } : null;
            }
            return item;
        }).filter(Boolean); // Удаляет товар, если qty стал 0
        updateCartInStorage(updated);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (email) {
            localStorage.setItem('userEmail', email);
            setUser(email);
            setIsLoginOpen(false);
            setEmail('');
        }
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('userEmail');
        setIsLogoutModalOpen(false);
    };

    const removeFromHeader = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const updated = cart.filter(item => item.id !== id);
        updateCartInStorage(updated);
    };

    return (
        <div>
            <header className="site-header">
                <div className="header-top-bar">
                    <div className="promo-info">
                        <span className="star-icon">☀️</span>
                        <span>Доставка по Бишкеку за 30-40 минут. Закажи прямо сейчас!</span>
                    </div>

                    <div className="location-info">
                        <div className="ikons"><FaLocationDot /></div>
                        <span>Доставка по всему Бишкеку и пригородам</span>
                    </div>

                    <div className="cart-details">
                        <div className="cart-icon-wrapper">
                            <GrBasket onClick={() => setCartOpen(!cartOpen)} className={`shop-cart ${cartOpen ? 'active' : ''}`} />
                            
                            {cartOpen && (
                                <div className='shop-cart-modal'>
                                    <div className="basket-header">
                                        <GrBasket className='basket-icon' />
                                        <h2>Моя корзина</h2>
                                    </div>
                                    <div className="basket-items-list">
                                        {items.length > 0 ? items.map((item) => (
                                            <div key={item.id} className="basket-item">
                                                <img src={item.avatar || item.img} alt={item.name} className="basket-item-img" />
                                                <div className="item-details">
                                                    <span className="item-name">{item.name}</span>
                                                    
                                                    {/* УПРАВЛЕНИЕ КОЛИЧЕСТВОМ */}
                                                    <div className="qty-controls" style={{display: 'flex', alignItems: 'center', gap: '8px', marginTop: '5px'}}>
                                                        <button onClick={() => decreaseQty(item.id)} style={{width:'22px', height:'22px', border:'1px solid #ddd', background:'#f9f9f9', cursor:'pointer', borderRadius:'4px'}}>-</button>
                                                        <span style={{fontWeight:'bold', fontSize:'14px'}}>{item.qty || 1}</span>
                                                        <button onClick={() => increaseQty(item.id)} style={{width:'22px', height:'22px', border:'1px solid #ddd', background:'#f9f9f9', cursor:'pointer', borderRadius:'4px'}}>+</button>
                                                    </div>

                                                    <span className="item-price" style={{display:'block', marginTop:'5px', fontWeight:'bold', color:'#ff9800'}}>
                                                        {(parseFloat(item.price) * (item.qty || 1))} сом
                                                    </span>
                                                </div>
                                                <button className="item-remove-btn" onClick={() => removeFromHeader(item.id)}>
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        )) : <p className="empty-txt">Корзина пуста</p>}
                                    </div>
                                    <div className="total-to-pay-block">
                                        <span>Сумма заказа</span>
                                        <span>{cartData.total} сом</span>
                                    </div>
                                    <button className="checkout-btn" onClick={() => { setCartOpen(false); navigate('/checkout'); }}>
                                        <FaArrowRightToBracket /> К оплате
                                    </button>
                                </div>
                            )}
                            <span className="item-count">{cartData.count} блюд</span>
                        </div>
                        <div className="cart-amount">
                            <span>{cartData.total} сом</span>
                        </div>
                    </div>
                </div>

                <nav className="header-main-nav">
                    <div className="logo" onClick={() => navigate('/')} style={{cursor:'pointer'}}>
                        <h1>Order<span className="logo-icon">¥</span></h1>
                    </div>

                    <ul className="nav-list">
                        <li><NavLink to="/home">Главная</NavLink></li>
                        <li><NavLink to="/restaurant">Меню</NavLink></li>
                        <li><NavLink to="/promotions">Акции</NavLink></li>
                        <li><NavLink to="/checkout">Заказы</NavLink></li>
                    </ul>

                    {user ? (
                        <div className="login-signup-btn logged-in" onClick={() => setIsLogoutModalOpen(true)} style={{cursor: 'pointer', background: '#333', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 20px', borderRadius: '25px'}}>
                            <div className="login"><img src={log} alt="User" style={{filter: 'brightness(0) invert(1)', width: '20px'}} /></div>
                            <span style={{fontWeight: 'bold'}}>{user.split('@')[0]}</span>
                        </div>
                    ) : (
                        <button className="login-signup-btn" onClick={() => setIsLoginOpen(true)} style={{border:'none', cursor:'pointer'}}>
                            <div className="login"><img src={log} alt="Login" /></div>
                            Вход/Регистрация
                        </button>
                    )}
                </nav>

                {/* МОДАЛКА ВХОДА И ВЫХОДА ОСТАЮТСЯ БЕЗ ИЗМЕНЕНИЙ */}
                {isLoginOpen && (
                    <div className="modal-overlay-react" onClick={() => setIsLoginOpen(false)}>
                        <div className="modal-content-react" onClick={(e) => e.stopPropagation()}>
                            <button className="close-button-react" onClick={() => setIsLoginOpen(false)}>&times;</button>
                            <div className="login-header">
                                <h3>Вход в систему</h3>
                                <p>Введите ваш Email для входа</p>
                            </div>
                            <form className='login-form' onSubmit={handleLogin}>
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    required 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc'}}
                                />
                                <button type="submit" className="submit-login-btn" style={{width: '100%', padding: '10px', background: '#fc8019', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer'}}>Войти</button>
                            </form>
                        </div>
                    </div>
                )}

                {isLogoutModalOpen && (
                    <div className="modal-overlay-react" onClick={() => setIsLogoutModalOpen(false)}>
                        <div className="modal-content-react" onClick={(e) => e.stopPropagation()} style={{textAlign: 'center', padding: '30px'}}>
                            <div style={{fontSize: '40px', marginBottom: '10px'}}>👋</div>
                            <h3>Выход из аккаунта</h3>
                            <p style={{color: '#666', marginBottom: '20px'}}>Вы действительно хотите выйти?</p>
                            <div style={{display: 'flex', gap: '10px'}}>
                                <button onClick={handleLogout} style={{flex: 1, padding: '10px', background: '#ff4d4f', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'}}>Да, выйти</button>
                                <button onClick={() => setIsLogoutModalOpen(false)} style={{flex: 1, padding: '10px', background: '#eee', color: '#333', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'}}>Отмена</button>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </div>
    )
}

export default Header;