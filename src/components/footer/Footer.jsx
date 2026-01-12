import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2 className="footer-logo">Order<span>¥</span></h2>
          <div className="social-links">
            <a href="https://www.instagram.com/wvpalri?igsh=MTFqdXk4bWU3OG4yag%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="social-icon inst"><FaSquareInstagram /></a>
            <a href="https://t.me/wvpalrii" target="_blank" rel="noreferrer" className="social-icon tg"><FaTelegram /></a>
            <a href="" target="_blank" rel="noreferrer" className="social-icon yt "><FaSquareWhatsapp /></a>
          </div>
          <p className="company-info">ОсОО "Ордер КейДжи", <br /> г.  г. Бишкек.</p>
        </div>

        {/* Рассылка */}
        <div className="footer-subscribe">
          <h4>Эксклюзивные акции на почту</h4>
          <form className="subscribe-form">
            <input type="email" placeholder="youremail@gmail.com" required />

            <button type="submit" className="btn-subscribe">Узнавать об акциях</button>
          </form>

          <p className="no-spam-text">Никакого спама. Только купоны и скидки раз в неделю.</p>

        </div>


        <div className="footer-links">
          <h3>Информация</h3>
          <ul>
            <li><Link to="/about-us">О нас</Link></li>
            <li><Link to="/faq">Вопросы и ответы</Link></li>

            <li><Link to="/all-reviews">Отзыв</Link></li>
          </ul>
        </div>


        <div className="footer-links">
          <h3>Меню сайта</h3>
          <ul>
            <li><Link to="/signup-partner">Стать партнером</Link></li>
            <li><Link to="/signup-courier">Стать курьером</Link></li>
            <li><Link to="/about">Подробнее</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© 2026 Order¥ Delivery. Все права защищены.</p>
          <div className="payment-methods">

            <span>VISA</span>
            <span>MasterCard</span>
            <span>Элкарт</span>
            <span className="mbank-tag">M-Bank</span>
          </div>
          <div className="footer-bottom-links">
            <Link to="/terms">Условия</Link>
            <Link to="/prices">Цены</Link>
            <Link to="/sitemap">Карта сайта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;