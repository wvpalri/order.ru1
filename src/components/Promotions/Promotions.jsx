import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Promotions.css';

// Импорты картинок (убедись, что пути верные)
import myByrger from '../../assets/resto1.png'
import Kfc from '../../assets/resto2.png'
import woklag from '../../assets/resto3.png'
import halalBur from '../../assets/resto4.png'
import point from '../../assets/resto5.png'
import kulikov from '../../assets/resto6.png'

const promotionsData = [
  {
    id: 1,
    restaurant: "KFC",
    logo: Kfc,
    title: "Бесплатная доставка",
    description: "Закажите любимые баскеты от 1000 сомов — и доставка за наш счет!",
    color: "#e4002b",
    promoConfig: { type: 'FREE_DELIVERY', minSum: 1000 }
  },
  {
    id: 2,
    restaurant: "Kulikov",
    logo: kulikov,
    title: "Десерт в подарок",
    description: "При заказе любого горячего блюда — порция нежнейшего торта в подарок.",
    color: "#6b2d82",
    promoConfig: { type: 'GIFT', giftName: 'Кусочек торта' }
  },
  {
    id: 3,
    restaurant: "Мой Бургер",
    logo: myByrger,
    title: "1+1 на все Чизбургеры",
    description: "Только по вторникам: покупай один бургер и получай второй бесплатно!",
    color: "#fc8a06",
    promoConfig: { type: 'BOGO', targetItem: 'Чизбургер' }
  },
  {
    id: 4,
    restaurant: "Halal-Burger",
    logo: halalBur,
    title: "Комбо-микс для компании",
    description: "Закажите 3 любых бургера и получите большую порцию фри и литр колы в подарок!",
    color: "#009640",
    promoConfig: { type: 'GIFT', giftName: 'Фри + Кола 1л' }
  },
  {
    id: 5,
    restaurant: "Woklagan",
    logo: woklag,
    title: "Счастливые часы на WOK",
    description: "С понедельника по четверг с 15:00 до 18:00 — вторая коробочка лапши за полцены!",
    color: "#E21A22",
    promoConfig: { type: 'DISCOUNT', value: 0.5, target: 'WOK' }
  },
  {
    id: 6,
    restaurant: "Point",
    logo: point,
    title: "Твой идеальный завтрак",
    description: "При покупке любого авторского кофе до 11:00 — круассан или десерт со скидкой 50%.",
    color: "#2B2B2B",
    promoConfig: { type: 'DISCOUNT', value: 0.5, target: 'Круассан' }
  }
];

const Promotions = () => {
  const navigate = useNavigate();
  // Состояние для хранения выбранной акции (для модалки)
  const [selectedPromo, setSelectedPromo] = useState(null);

  // 1. Открываем модалку при клике на карточку
  const handleOpenModal = (promo) => {
    console.log("Кнопка нажата, выбрана акция:", promo.restaurant);
    setSelectedPromo(promo);
  };

  // 2. Переходим к заказу при клике ВНУТРИ модалки
  const handleApplyAndNavigate = () => {
    if (selectedPromo) {
      console.log("Применяем акцию и уходим на страницу ресторана");
      // Сохраняем в память
      localStorage.setItem('activePromo', JSON.stringify(selectedPromo));
      // Переходим
      navigate('/restaurant', { state: { filter: selectedPromo.restaurant } });
      // Закрываем модалку
      setSelectedPromo(null);
    }
  };

  return (
    <div className="promotions-page">
      <div className="promo-container">
        <h1>Все актуальные акции</h1>
        
        <div className="promo-list">
          {promotionsData.map((promo) => (
            <div key={promo.id} className="promo-card">
              <div className="promo-left">
                <div className="promo-logo-circle" style={{ borderColor: promo.color }}>
                  <img src={promo.logo} alt={promo.restaurant} />
                </div>
              </div>
              
              <div className="promo-info">
                <span className="promo-restaurant-name" style={{ color: promo.color }}>
                  {promo.restaurant}
                </span>
                <h2 className="promo-title">{promo.title}</h2>
                <p className="promo-description">{promo.description}</p>
              </div>

              <div className="promo-action">
                {/* ВНИМАНИЕ: Проверь этот onClick */}
                <button className="promo-btn" onClick={() => handleOpenModal(promo)}>
                  Воспользоваться
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* МОДАЛЬНОЕ ОКНО */}
     {/* МОДАЛЬНОЕ ОКНО */}
{selectedPromo && (
  <div 
    className="modal-overlay-custom" 
    onClick={() => setSelectedPromo(null)}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.85)', // Темный полупрозрачный фон
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10000, // Поверх всего
      backdropFilter: 'blur(5px)' // Размытие заднего фона
    }}
  >
    <div 
      className="promo-modal-custom" 
      onClick={(e) => e.stopPropagation()}
      style={{
        background: 'white',
        padding: '40px',
        borderRadius: '24px',
        textAlign: 'center',
        maxWidth: '450px',
        width: '90%',
        color: '#333',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        animation: 'modalAppear 0.3s ease-out' // Анимация появления
      }}
    >
      <div style={{ 
          width: '90px', 
          height: '90px', 
          margin: '0 auto 20px',
          borderRadius: '50%', 
          border: `4px solid ${selectedPromo.color}`,
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#f9f9f9'
      }}>
         <img src={selectedPromo.logo} alt="logo" style={{ width: '70%', objectFit: 'contain' }} />
      </div>
      
      <h2 style={{ color: selectedPromo.color, margin: '10px 0', fontSize: '28px' }}>
        {selectedPromo.restaurant}
      </h2>
      <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>{selectedPromo.title}</h3>
      <p style={{ color: '#666', lineHeight: '1.5' }}>{selectedPromo.description}</p>
      
      <div style={{ 
          background: '#f0f0f0', 
          padding: '20px', 
          borderRadius: '15px', 
          margin: '25px 0', 
          border: '2px dashed #ccc' 
      }}>
        <small style={{ color: '#888', display: 'block', marginBottom: '5px' }}>
            Промокод применится в корзине:
        </small>
        <div style={{ fontSize: '22px', fontWeight: 'bold', letterSpacing: '2px' }}>
          {selectedPromo.restaurant.toUpperCase()}-2024
        </div>
      </div>
      
      <button 
        onClick={handleApplyAndNavigate}
        style={{
          width: '100%',
          padding: '18px',
          backgroundColor: selectedPromo.color,
          color: 'white',
          border: 'none',
          borderRadius: '14px',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        Применить и перейти к меню
      </button>
      
      <button 
        onClick={() => setSelectedPromo(null)}
        style={{
          marginTop: '15px',
          background: 'none',
          border: 'none',
          color: '#888',
          cursor: 'pointer',
          textDecoration: 'underline'
        }}
      >
        Закрыть
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default Promotions;