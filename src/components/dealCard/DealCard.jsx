import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DealCard.css';


function DealCard() {
  const [categories, setCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    const fetchData = async () => {
        try {
            
            await new Promise(resolve => setTimeout(resolve, 500)); 
            
            const response = await fetch('/db.json'); 
            const data = await response.json();

            setCategories(data.categories);
            setRestaurants(data.restaurants);
            setLoading(false);
        } catch (error) {
            console.error("Ошибка:", error);
            setLoading(false);
        }
    };
    fetchData();
}, []);

  if (loading) return <div className="loader">Загрузка...</div>;

  return (
    <div className="deal-section">
    
    

     
      <div className="categoris">
        <div className="text-categor">
          <h1>Order.uk Популярные категории</h1>
        </div>
        <div className="categori-menu">
          {categories.map((cat) => (
            <div key={cat.id} className="cati">
              <Link to="/restaurant">
              
                <img src={`/src/assets/${cat.img}`} alt={cat.name} />
                <h1>{cat.name}</h1>
                <p>{cat.count}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

    
     <div className="popular-rest">
  <div className="text-popular">
    <h1>Популярные рестораны</h1>
  </div>
  <div className="pop-rest-menu">
    {restaurants.map((rest, index) => {
      const slugs = ["my-burger", "kfc", "w-chili", "halal-burger", "point-b", "og-resto"];
      const currentSlug = slugs[index] || "mcdonalds";

      return (
        <div key={rest.id} className="res-pop">
          <Link to={`/restaurant/${currentSlug}`}>
            <img src={`/src/assets/${rest.img}`} alt={rest.name} />
          </Link>
        </div>
      );
    })}
  </div>
</div>
    </div>
  );
}

export default DealCard;