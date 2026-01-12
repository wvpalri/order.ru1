import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function OrderSuccess() {
    const navigate = useNavigate();
    const location = useLocation();

    // Эта строка создает номер ОДИН РАЗ и запоминает его
    const [orderNumber] = useState(Math.floor(Math.random() * 9000) + 1000);
    
    const orderName = location.state?.name || "Гость";
    const orderTotal = location.state?.total || 0;

    const [statusIndex, setStatusIndex] = useState(0);
    const statuses = [
        { label: 'Заказ принят', icon: '📝', desc: 'Мы получили ваш заказ' },
        { label: 'Готовится', icon: '👨‍🍳', desc: 'Шеф-повар уже начал готовить' },
        { label: 'Передан курьеру', icon: '🚴', desc: 'Курьер забрал ваш обед' },
        { label: 'Курьер в пути', icon: '📍', desc: 'Еда будет у вас через пару минут' },
        { label: 'Доставлено', icon: '🎁', desc: 'Приятного аппетита!' }
    ];

    useEffect(() => {
        if (statusIndex < statuses.length - 1) {
            const timer = setTimeout(() => {
                setStatusIndex(prev => prev + 1);
            }, 6000); 
            return () => clearTimeout(timer);
        }
    }, [statusIndex]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
            textAlign: 'center',
            padding: '20px',
            fontFamily: 'sans-serif'
        }}>
            <div style={{ fontSize: '100px', marginBottom: '10px' }}>
                {statuses[statusIndex].icon}
            </div>

            <h1 style={{ color: '#fc8019', fontSize: '32px', margin: '10px 0' }}>
                {statuses[statusIndex].label}
            </h1>

            <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>
                {statuses[statusIndex].desc}
            </p>

            <div style={{ 
                display: 'flex', 
                gap: '10px', 
                marginBottom: '30px',
                width: '100%',
                maxWidth: '300px' 
            }}>
                {statuses.map((_, index) => (
                    <div key={index} style={{
                        height: '8px',
                        flex: 1,
                        backgroundColor: index <= statusIndex ? '#fc8019' : '#eee',
                        borderRadius: '4px',
                        transition: 'all 0.5s ease'
                    }} />
                ))}
            </div>

            <div style={{ backgroundColor: '#fff5ed', padding: '20px', borderRadius: '15px', width: '100%', maxWidth: '400px' }}>
                <p style={{ fontSize: '18px', margin: '5px 0' }}>
                    Спасибо, <strong>{orderName}</strong>!
                </p>
                <p style={{ fontSize: '16px', color: '#666' }}>
                    Сумма к оплате: <strong>{orderTotal} сом</strong>
                </p>
                
                {/* ИСПРАВЛЕНО ТУТ: Вместо Math.random() теперь используем orderNumber */}
                <p style={{ fontSize: '14px', color: '#888', marginTop: '10px' }}>
                    Номер заказа: #{orderNumber}
                </p>
            </div>
            
            <button 
                onClick={() => navigate('/')}
                style={{
                    marginTop: '40px',
                    padding: '15px 40px',
                    backgroundColor: '#fc8019',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(252, 128, 25, 0.3)'
                }}
            >
                На главную
            </button>
        </div>
    );
}

export default OrderSuccess;