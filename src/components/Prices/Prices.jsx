import React from 'react';
import { FaTag, FaPercentage, FaBoxOpen, FaInfoCircle } from 'react-icons/fa';
import './InfoPages.css';

const Prices = () => {
  return (
    <div className="info-page">
      <h1 className="page-title">Цены и сборы</h1>
      
      <div className="info-grid">
        <div className="info-card">
          <FaTag className="info-icon" />
          <h3>Цены на блюда</h3>
          <p>Все цены в нашем приложении полностью соответствуют ценам в официальном меню ресторанов. Мы не делаем скрытых наценок.</p>
        </div>

        <div className="info-card">
          <FaBoxOpen className="info-icon" />
          <h3>Упаковка</h3>
          <p>Некоторые рестораны могут взимать небольшую плату за контейнеры и пакеты (обычно от 10 до 30 сом).</p>
        </div>

        <div className="info-card">
          <FaPercentage className="info-icon" />
          <h3>Сервисный сбор</h3>
          <p>В итоговый чек может быть включен процент за обслуживание, если это предусмотрено правилами конкретного заведения.</p>
        </div>
      </div>
    </div>
  );
};

export default Prices;