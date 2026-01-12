import React from 'react';
import { Link } from 'react-router-dom';
import { FaSitemap, FaHome, FaUtensils, FaFileAlt } from 'react-icons/fa';
import './InfoPages.css';

const Sitemap = () => {
  return (
    <div className="info-page">
      <h1 className="page-title">Карта сайта</h1>
      
      <div className="sitemap-container">
        <div className="sitemap-section">
          <h3><FaHome /> Основное</h3>
          <ul>
            <li><Link to="/">Главная страница</Link></li>
            <li><Link to="/menu">Общее меню</Link></li>
          </ul>
        </div>

        <div className="sitemap-section">
          <h3><FaUtensils /> Рестораны</h3>
          <ul>
            <li><Link to="/restorant/kfc">KFC</Link></li>
            <li><Link to="/restorant/kulikov">Kulikov</Link></li>
            <li><Link to="/restorant/point">Point</Link></li>
              <li><Link to="/restorant/point">Woklagman</Link></li>
                <li><Link to="/restorant/point">Halal-burger</Link></li>
                  <li><Link to="/restorant/point">Мой бургер</Link></li>

          </ul>
        </div>

        <div className="sitemap-section">
          <h3><FaFileAlt /> Информация</h3>
          <ul>
            <li><Link to="/terms">Условия доставки</Link></li>
            <li><Link to="/prices">Цены</Link></li>
            <li><Link to="/sitemap">Карта сайта</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;