import React, { useState, useEffect } from 'react';
import './Sugnup.css';


function Sugnup({ initialRole }) {
const [role, setRole] = useState(initialRole || 'partner');

 
  useEffect(() => {
    if (initialRole) {
      setRole(initialRole);
    }
  }, [initialRole]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Заявка успешно отправлена!');
  };
  return (
    <div className='sugnup-cards'>
      <div className="sugnup-bloks">
     
        <div className="cards partner-cards">
          <div className="cards-tag">Зарабатывайте больше с низкой комиссией</div>
          <div className="card-info-box">
            <h2>Для бизнеса</h2>
            <h3>Станьте нашим партнером</h3>
            <button type="button" onClick={() => openModal('partner')} className="btn-ord">Начать</button>
          </div>
        </div>

       
        <div className="cards rider-card">
          <div className="cards-tag">Получайте эксклюзивные бонусы</div>
          <div className="card-info-box">
            <h2>Для курьеров</h2>
            <h3>Работайте с нами</h3>
            <button type="button" onClick={() => openModal('courier')} className="btn-ord">Начать</button>
          </div>
        </div>
      </div>

     <div className="signup-section-wrapper">
      <div className="signup-block-content">
        
        <div className="form-header-simple">
          <h2>Регистрация: {role === 'partner' ? 'Для бизнеса' : 'Для курьеров'}</h2>
          <p>Заполните форму, чтобы начать зарабатывать уже сегодня!</p>
        </div>

        <form className="signup-horizontal-form" onSubmit={handleSubmit}>
          <div className="form-inputs-grid">
            <input type="text" placeholder="Ваше имя" required />
            <input type="email" placeholder="Email" required />
            <input type="tel" placeholder="Номер телефона" required />
          </div>

          <div className="form-actions-row">
            <button type="submit" className="orange-submit-btn">
              Отправить заявку
            </button>
            
            {role === 'courier' && (
              <div className="courier-badge-green">
                <span className="badge-check">✓</span>
                Присоединяйтесь к 17,000+ райдеров!
              </div>
            )}
          </div>
        </form>

      </div>
    </div>
    </div>
  );
}

export default Sugnup;