import React, { useState } from 'react';
import './DeliveryModal.css';

const DeliveryModal = ({ onClose }) => {
   
  const handleFinalClose = () => {
    localStorage.setItem('modalShown', 'true'); 
    onClose();
  };

    console.log("!!! Я ТУТ, Я СУЩЕСТВУЮ !!!");
  const [step, setStep] = useState(1); 
  const [inputValue, setInputValue] = useState('');

  const handleFind = () => {
    
    if (inputValue.toUpperCase() === 'EN4 9QF') setStep(2);
    else if (inputValue.length > 3) setStep(3);
  };
    
  return (
   <div className="delivery-modal-wrapper">
      <div className="delivery-modal-card">
        <button className="close-x" onClick={onClose}>×</button>
        
        <div className="modal-image">
        
        </div>

        <div className="modal-content">
          {step === 1 && (
            <>
              <h2>Введите ваш почтовый индекс</h2>
              <p>Чтобы начать оформление заказа, пожалуйста, укажите ваш полный индекс ниже</p>
              <div className="input-group">
                <input 
                  type="text" 
                  placeholder="например, AA1 1BB" 
                  onChange={(e) => setInputValue(e.target.value)} 
                />
                <button className="btn-orange" onClick={handleFind}>Найти</button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="error-title">Проверьте ваш <span className="red-text">индекс</span></h2>
              <input type="text" value={inputValue} readOnly />
              <button className="btn-dark" onClick={() => setStep(1)}>Поиск</button>
              <p className="error-msg">Извините, мы не осуществляем доставку в ваш район.</p>
            </>
          )}

          {step === 3 && (
            <>
              <h2>Все готово! <span className="green-text">Индекс</span> принят</h2>
              <div className="input-group">
                <input type="text" value={inputValue} readOnly />
                <button className="btn-dark" onClick={() => setStep(1)}>Изменить</button>
              </div>
              <p className="success-msg">Мы доставляем в ваш район.</p>
              <button className="btn-orange" onClick={() => setStep(4)}>Продолжить</button>
            </>
          )}

          {step === 4 && (
            <div className="final-step">
              <h2>Заказать сейчас</h2>
              <p>Минимальная сумма доставки — 1000 сом</p>
              <button className="btn-dark" onClick={onClose}>Доставка на дом</button>
              <button className="btn-orange" onClick={onClose}>Я заберу сам (Самовывоз)</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryModal;