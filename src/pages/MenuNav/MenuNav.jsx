import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa"; 
import './MenuNav.css'

function MenuNav({ onSearch, setActiveCategory, activeCategory, categories }) {
  const navigate = useNavigate();
 
  return (
    <aside className="sidebar-menu">
      <button className="back-btn" onClick={() => navigate('/')}>
        <span className="arrow">←</span> Все рестораны
      </button>

      <div className="sidebar-content">
        <h2 className="sidebar-title">Меню</h2>

        <div className="sidebar-search">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Поиск..." 
            onChange={(e) => onSearch(e.target.value)} 
          />
        </div>
        
        <nav className="category-list">
          {categories?.map(cat => (
            <button
              key={cat.id}
              className={`sidebar-link ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default MenuNav;