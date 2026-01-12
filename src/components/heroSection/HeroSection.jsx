import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './HeroSection.css'
import gerl from '../../assets/gerl2.png'

const mockupsData = [
    {
        id: 1,
        headerText: "Курьер уже рядом.",
        detailText: "Курьер уже рядом.",
        notificationClass: "status-1"
    },
    {
        id: 2,
        headerText: 'Заказ получен!',
        detailText: "Ожидается одобрение ресторана.",
        notificationClass: "status-2"
    },
    {
        id: 3,
        headerText: `Заказ принят!`,
        detailText: "Ваш заказ будет доставлен в ближайшее время.",
        notificationClass: "status-3"
    }
];

const OrderStatusMockup = ({ headerText, detailText, notificationClass }) => {
    return (
        <div className={`status-notification ${notificationClass}`}>
            <div className="order-header">
                Заказ<span className="now">сейчас</span>
            </div>
            <p dangerouslySetInnerHTML={{ __html: headerText }} />
            <p className="detail">{detailText}</p>
        </div>
    );
};

function HeroSection() {
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (searchValue.trim().length > 2) {
            setIsLoading(true); 

           
            setTimeout(() => {
                localStorage.setItem('userLocation', searchValue);
                window.dispatchEvent(new Event('locationUpdated'));
                
                setIsLoading(false);
                navigate('/restaurant'); 
            }, 1500);
            
        } else {
            alert("Пожалуйста, введите корректный индекс (например, EC4R 3TE)");
        }
    }

    return (
        <div className='hero-section'>
            <div className="blok-section">
                <div className="left-section">
                    <p>Заказывайте еду и продукты.</p>
                    <h1>Вкусно,</h1>
                    <h1 className='oranj'>быстро и свежее.</h1>
                    <p>Введите индекс, чтобы начать.</p>
                    <div className="btn">
                        <form className="search-form" onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                name="postcode" 
                                placeholder="e.g. EC4R 3TE" 
                                className="postcode-input"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                disabled={isLoading}
                            />
                            <button 
                                type="submit" 
                                className={`search-btn ${isLoading ? 'loading' : ''}`} 
                                disabled={isLoading}
                            >
                                {isLoading ? <div className="spinner"></div> : 'Поиск'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="right-section">
                    <div className="hero-visuals">
                        <div className="ser-section">
                            <img src={gerl} alt="Girl with pizza" />
                        </div>
                        <div className="visual-container">
                            <div className="orange-overlay">
                                {mockupsData.map(data => (
                                    <div key={data.id} className="number">{data.id}</div>
                                ))}
                            </div>

                            {mockupsData.map(data => (
                                <OrderStatusMockup 
                                    key={data.id}
                                    headerText={data.headerText}
                                    detailText={data.detailText}
                                    notificationClass={data.notificationClass}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection;