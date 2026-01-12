import React from 'react';
import { FaTruck, FaWallet, FaClock, FaCheckCircle } from 'react-icons/fa';
import './InfoPages.css';

const Terms = () => {
  return (
    <div className="info-page">
      <h1 className="page-title">Условия доставки и оплаты</h1>
      
      <div className="info-grid">
        <div className="info-card">
          <FaTruck className="info-icon" />
          <h3>Доставка</h3>
          <p>Мы доставляем заказы по всему городу. Среднее время ожидания составляет 45–60 минут в зависимости от загруженности дорог.</p>
          <div className="promo-badge">
            <FaCheckCircle /> Акция: При заказе от 1000 сом — доставка БЕСПЛАТНО!
          </div>
        </div>

        <div className="info-card">
          <FaWallet className="info-icon" />
          <h3>Оплата</h3>
          <p>Вы можете оплатить заказ наличными курьеру, через мобильный банкинг (MBANK, Элсом) или картой при получении.</p>
        </div>

        <div className="info-card">
          <FaClock className="info-icon" />
          <h3>Режим работы</h3>
          <p>Прием заказов осуществляется ежедневно с 10:00 до 23:00. В праздничные дни график может меняться.</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;