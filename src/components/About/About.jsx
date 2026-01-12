import React from 'react';
import { useNavigate } from 'react-router-dom';

import './About.css';
import StatisticsBar from '../StatisticsBar/StatisticsBar';

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
     
      <section className="about-hero">
        <h1>Ordery — Доставка еды в Бишкеке</h1>
        <p>Мы создаем технологии, которые делают заказ еды быстрым, простым и надежным.</p>
      </section>

      <div className="about-stats-wrapper">
        <StatisticsBar/>
      </div>

     
      <section className="about-mission">
        <div className="mission-content">
          <h2>Почему выбирают нас?</h2>
          <p>
            Наш сервис объединяет сотни лучших заведений города. Благодаря мощной сети из 
            <strong> 546+ курьеров</strong>, мы гарантируем доставку в кратчайшие сроки. 
            За всё время работы мы успешно передали клиентам более <strong>789,900 заказов</strong>.
          </p>
        </div>

        <div className="about-cards">
          <div className="about-card">
            <h3>Рестораны</h3>
            <p>У нас более 690 партнеров, от уютных кофеен до крупных сетей фастфуда.</p>
          </div>
          <div className="about-card">
            <h3>Разнообразие</h3>
            <p>В нашем приложении доступно 17,457+ блюд: от суши и пиццы до домашних обедов.</p>
          </div>
        </div>
      </section>

      
      <section className="about-footer-cta">
        <h2>Готовы сделать заказ?</h2>
        <button className="cta-button" onClick={() => navigate('/restaurant')}>Перейти к меню</button>
      </section>
    </div>
  );
}

export default About;