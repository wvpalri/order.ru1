import React from 'react'
import './RestaurantHero.css'

function RestaurantHero({ restaurant }) {
  if (!restaurant) return null;

  return (
    <div>
      <div className="hero-container">
        <div 
          className="hero-bg" 
          style={{ 
            backgroundImage: `url(${restaurant.heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-text">
            <p>Вот что я люблю!</p>
            <h1>{restaurant.name} <br /> {restaurant.address}</h1>
            
          <div className="info-tags">
            
              <span>Мин.заказ: {restaurant.minOrder || "0 сомов"}</span>
              <span>{restaurant.deliveryTime || "---"}</span>
            </div>
          </div>
        </div>
        
        
        <div className="rating-box">
          <span className="score">{restaurant.rating || "0.0"}</span>
          <div className="stars">{restaurant.stars || "☆☆☆☆☆"}</div>
          <p>{restaurant.reviewsCount || "0"} отзывов.</p>
        </div>
          
        <div className="status-badge">
          <span>🕒 Работаем до 03:00</span>
        </div>
      </div>
    </div>
  )
}

export default RestaurantHero