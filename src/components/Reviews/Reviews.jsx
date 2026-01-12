import React, { useState, useEffect } from 'react';
import './Reviews.css';
import { FaStar } from 'react-icons/fa';

function Reviews({ reviewsData }) {
  // Загружаем начальные отзывы из данных ресторана
  const [reviews, setReviews] = useState(reviewsData || []);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);

  // Если ресторан сменился (перешли на другой), обновляем список
  useEffect(() => {
    setReviews(reviewsData || []);
  }, [reviewsData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !text) return alert("Пожалуйста, заполните поля!");

    const newReview = {
      id: Date.now(),
      author: name,
      city: "Бишкек",
      date: "Сегодня",
      stars: rating,
      text: text,
      isNew: true
    };

    setReviews([newReview, ...reviews]); 
    setName('');
    setText('');
  };

  return (
    <section className="reviews-section">
      <div className="reviews-container">
        
        {/* ЛЕВАЯ КОЛОНКА: ФОРМА */}
        <div className="reviews-form-side">
          <h2>Ваш отзыв</h2>
          <form className="add-review-card" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Имя" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <select 
            className="review-select"
            value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              <option value="5">⭐⭐⭐⭐⭐ 5 звезд</option>
              <option value="4">⭐⭐⭐⭐ 4 звезды</option>
              <option value="3">⭐⭐⭐ 3 звезды</option>
            </select>
            <textarea 
              placeholder="Напишите впечатления..." 
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button type="submit">Опубликовать</button>
          </form>
        </div>

        {/* ПРАВАЯ КОЛОНКА: КАРТОЧКИ ЛЮДЕЙ */}
        <div className="reviews-content-side">
          <h2>Что говорят другие</h2>
          <div className="reviews-grid">
            {reviews.map((rev) => (
              <div key={rev.id} className={`review-card ${rev.isNew ? 'new-entry' : ''}`}>
                <div className="review-top">
                  <strong>{rev.author}</strong>
                  <div className="stars-row">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={10} color={i < rev.stars ? "#ffc107" : "#ddd"} />
                    ))}
                  </div>
                </div>
                <p className="review-date">{rev.city} • {rev.date}</p>
                <p className="review-body">{rev.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Reviews;