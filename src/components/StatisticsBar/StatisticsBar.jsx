import React from 'react'
import './StatisticsBar.css'; 

const statisticsData = [
    { number: '546+', label: 'Зарегистрированных курьеров' },
    { number: '789,900+', label: 'Доставленных заказов' },
    { number: '690+', label: 'Ресторанов-партнеров' },
    { number: '17,457+', label: 'Блюд в меню' },
];

function StatisticsBar() {
  return (
    <div>
      <section className="statistics-bar-container">
            <div className="statistics-bar">
                {statisticsData.map((stat, index) => (
                  
                    <div key={index} className="stat-item">
                        <span className="stat-number">{stat.number}</span>
                        <span className="stat-label">{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    </div>
  )
}

export default StatisticsBar
