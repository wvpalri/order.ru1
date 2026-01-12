import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Restorant.css';

import DeliveryModal from '../../components/DeliveryModal/DeliveryModal';
import RestaurantHero from '../RestaurantHero/RestaurantHero';
import MenuNav from '../MenuNav/MenuNav';
import { restaurantList } from './RestorantData';
import Reviews from '../../components/Reviews/Reviews';
import RestaurantMap from '../../components/RestaurantMap/RestaurantMap';

function Restorant() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  // 1. Находим текущий ресторан
  const currentRestaurant = restaurantList?.find(res => res.slug === slug);
  const items = currentRestaurant?.items || [];

  // 2. СЛОВАРЬ ПЕРЕВОДА
  const categoryNames = {
    burgers: "Бургеры",
    drinks: "Напитки",
    hottea: "Горячий чай",
    sauces: "Соусы",
    salads: "Салаты",
    deserts: "Десерты",
    snacks: "Закуски",
    chicken: "Курица",
    combo: "Комбо",
    kebabs: "Кебабы",
    fries: "Гарниры",
    ganfan: "Ганфан",
    dishes: "Блюда",
    lagman: "Лагман",
    shaurma: "Шаурма",
    doner: "Донеры",
    hot_dishes: "Горячие блюда",
    hotdogs: "Хот-доги",
    breakfast: "Завтраки",
    sushi: "Суши",
    pizza: "Пицца"
  };


  const dynamicCategories = [
    ...new Set(items.map(item => item.category))
  ].map(catId => ({
    id: catId,
    name: categoryNames[catId] || catId
  }));


  useEffect(() => {
    if (currentRestaurant && items.length > 0) {
      setActiveCategory(items[0].category);
      window.scrollTo(0, 0);
    }
  }, [slug, currentRestaurant, items]);

  if (!currentRestaurant) {
    return <div className="no-results" style={{ padding: '100px', textAlign: 'center' }}><h1>Ресторан не найден</h1></div>;
  }

  const onAdd = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      cart.push({ ...item, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const renderCard = (item) => (
    <div key={item.id} className="burger-card" onClick={() => navigate(`/product/${item.id}`)}>
      <div className="burger-info">
        <h3 className="burger-name">{item.name}</h3>
        <p className="burger-description">{item.description}</p>
        <div className="burger-price-row">
          <span className="burger-price">{item.price} сом</span>
          {item.weight && <span className="burger-weight"> {item.weight}</span>}
        </div>
      </div>
      <div className="burger-image-wrapper">
        <img src={item.img} alt={item.name} className="burger-img" />
        <button className="add-to-cart-btn-small" onClick={(e) => {
          e.stopPropagation();
          onAdd(item);
        }}>
          <span className="plus-icon">+</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="restaurant-page">
      <RestaurantHero restaurant={currentRestaurant} />

      <div className="restaurant-main-layout">
        <MenuNav
          onSearch={setSearchQuery}
          setActiveCategory={setActiveCategory}
          activeCategory={activeCategory}
          categories={dynamicCategories}
        />

        <div className="restaurant-content-section">
          {/* Секция Акций */}
          <div className="section-header">
            <h2 className="section-title">Акции от {currentRestaurant.name}</h2>
          </div>

          <div className="offers-grid">
            {currentRestaurant.offers?.map((offer) => (
              <div key={offer.id} className="offer-card">
                <img src={offer.img} alt={offer.title} className="offer-image" />
                <div className="offer-overlay"></div>
                <span className="discount-badge">{offer.discount}</span>
                <div className="offer-details">
                  <p className="restaurant-name">{currentRestaurant.name}</p>
                  <h3 className="offer-title">{offer.title}</h3>
                </div>
              </div>
            ))}
          </div>


          <section className="page-section">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '40px',
              marginBottom: '20px'
            }}>
              <h2 className="section-title" style={{ margin: 0 }}>
                {searchQuery ? `Поиск: ${searchQuery}` : (categoryNames[activeCategory] || "Меню")}
              </h2>


              <div className="sort-box">
                <select
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">По умолчанию</option>
                  <option value="cheap">Сначала дешевые</option>
                  <option value="expensive">Сначала дорогие</option>
                </select>
              </div>
            </div>

            <div className="burger-grid">
              {(() => {

                let filtered = searchQuery
                  ? items.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  : items.filter(i => i.category === activeCategory);


                const sorted = [...filtered].sort((a, b) => {
                  if (sortBy === "cheap") return a.price - b.price;
                  if (sortBy === "expensive") return b.price - a.price;
                  return 0;
                });

                return sorted.length > 0
                  ? sorted.map(renderCard)
                  : <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '20px' }}>Ничего не найдено</p>;
              })()}
            </div>
          </section>
        </div>

        <aside className="restaurant-map-aside">
          <div className="map-sticky-box">
            <RestaurantMap restaurant={currentRestaurant} />
            <div className="map-info-card">
              <h3>Информация</h3>
              <p>📍 {currentRestaurant.address}</p>
              <p>🕒 Доставка: {currentRestaurant.deliveryTime}</p>
              <p>💰 Мин. заказ: {currentRestaurant.minOrder}</p>
            </div>
          </div>
        </aside>
      </div>
      {isModalOpen && <DeliveryModal onClose={() => setIsModalOpen(false)} />}
      <Reviews reviewsData={currentRestaurant.reviews} />
    </div>
  );
}

export default Restorant;