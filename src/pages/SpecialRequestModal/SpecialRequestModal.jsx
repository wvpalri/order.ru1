import React, { useState } from 'react';
import './SpecialRequestModal.css';

function SpecialRequestModal({ isOpen, onClose, product, onAdd }) {
  const [comment, setComment] = useState("");

  if (!isOpen || !product) return null;

  return (
    <div className="custom-overlay-backdrop">
      <div className="custom-modal-window">
        <button className="custom-close-trigger" onClick={onClose}>&times;</button>
        
        <div className="custom-modal-hero">
          <img src={product.img} alt={product.name} />
        </div>

        <div className="custom-modal-content-area">
          <p className="custom-breadcrumb-text">Главная {'>'} Меню {'>'} {product.name}</p>
          <h2 className="custom-product-main-title">Настройте ваш {product.name}</h2>
          
          <div className="custom-comment-section">
            <h3 className="custom-section-label">Особые пожелания</h3>
            <textarea 
              className="custom-comment-input"
              placeholder="Напишите здесь ваши пожелания (например, без лука или соус отдельно)..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="custom-modal-bottom-bar">
             <button className="custom-cancel-button" onClick={onClose}>Назад</button>
             <div className="custom-footer-actions">
                <div className="custom-price-display">
                  Итого: <span>{product.price} сом</span>
                </div>
                <button className="custom-submit-order-btn" onClick={() => {
                  onAdd(product, comment);
                  onClose();
                }}>
                  Добавить
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecialRequestModal;