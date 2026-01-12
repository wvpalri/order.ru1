import React, { useState } from 'react';
import './Questions.css';
import que1 from '../../assets/que1.png';
import que2 from '../../assets/gue2.png';
import que3 from '../../assets/gue3.png';
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdAttachEmail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaRocket } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
// import { GrLocationPin } from "react-icons/gr";
function Questions() {
    const [activeNav, setActiveNav] = useState('faq');
    const [activeTab, setActiveTab] = useState(0);

    const navItems = [
        { id: 'faq', label: 'Частые вопросы' },
        { id: 'about', label: 'Кто мы?' },
        { id: 'partner', label: 'Партнерская программа' },
        { id: 'support', label: 'Помощь и поддержка' }
    ];

    // Ответы для раздела FAQ
    const faqAnswers = [
        { 
            title: "Как работает Order.UK?", 
            text: "Order.UK — это мост между вами и вашими любимыми ресторанами. Вы выбираете блюда на сайте, мы мгновенно передаем заказ на кухню, а наши курьеры доставляют еду горячей прямо к вашей двери. Весь процесс от клика до получения занимает в среднем 30-40 минут.", 
            showCards: true 
        },
        { 
            title: "Какие способы оплаты принимаются?", 
            text: "Мы поддерживаем все современные способы оплаты в Кыргызстане: банковские карты Visa/MasterCard всех банков, национальную карту Элкарт, мобильные кошельки M-Bank, Элсом и О!Деньги. Также доступна оплата наличными курьеру при получении.", 
            showCards: false 
        },
        { 
            title: "Могу ли я отслеживать заказ?", 
            text: "Да! Сразу после подтверждения заказа вы сможете видеть его статус: 'Готовится', 'Передан курьеру' и 'Курьер в пути'. Мы используем GPS-трекинг, чтобы вы точно знали, где находится ваш обед.", 
            showCards: false 
        },
        { 
            title: "Есть ли специальные скидки?", 
            text: "Мы любим радовать клиентов! У нас действует бесплатная доставка при заказе от 700 сом, а при чеке от 1500 сом вы получаете подарок от заведения. Также ищите промокоды в наших социальных сетях.", 
            showCards: false 
        }
    ];

    return (
        <div className='quess' id="faq-section">
            <div className="faq-container">
                <header className="faq-header">
                    <h2>Узнайте о нас больше!</h2>
                    <nav className="faq-nav">
                        {navItems.map((item) => (
                            <span 
                                key={item.id}
                                className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
                                onClick={() => { setActiveNav(item.id); setActiveTab(0); }}
                            >
                                {item.label}
                            </span>
                        ))}
                    </nav>
                </header>

                <section className="faq-content">
                    {/* КОНТЕНТ: ЧАСТЫЕ ВОПРОСЫ */}
                    {activeNav === 'faq' && (
                        <>
                            <div className="questions-list">
                                {faqAnswers.map((item, index) => (
                                    <div 
                                        key={index} 
                                        className={`question-item ${activeTab === index ? 'active' : ''}`}
                                        onClick={() => setActiveTab(index)}
                                    >
                                        {item.title}
                                    </div>
                                ))}
                            </div>
                            <div className="answer-details">
                                {faqAnswers[activeTab].showCards && (
                                    <div className="process-cards">
                                        <div className="process-card">
                                            <div className="icon-wrapper"><img src={que1} alt="order" /></div>
                                            <h4>Закажите</h4>
                                            <p>Через сайт или мобильное приложение за пару секунд.</p>
                                        </div>
                                        <div className="process-card">
                                            <div className="icon-wrapper"><img src={que2} alt="track" /></div>
                                            <h4>Следите</h4>
                                            <p>Наблюдайте за прогрессом приготовления и доставкой.</p>
                                        </div>
                                        <div className="process-card">
                                            <div className="icon-wrapper"><img src={que3} alt="eat" /></div>
                                            <h4>Наслаждайтесь</h4>
                                            <p>Получите заказ и наслаждайтесь вкусной едой!</p>
                                        </div>
                                    </div>
                                )}
                                <div className="summary-text">
                                    <p>{faqAnswers[activeTab].text}</p>
                                </div>
                            </div>
                        </>
                    )}

                   
                    {activeNav === 'about' && (
                        <div className="info-tab-content">
                            <h3>Мы — Ordery</h3>
                            <p>Команда энтузиастов из Бишкека, которая верит, что заказ еды должен быть таким же простым, как отправка сообщения. Мы работаем с 2020 года и уже успели доставить более 700 тысяч заказов по всему городу.</p>
                            <ul className="info-list">
                                
                                <li><FaRocket /> Быстрая доставка в любой район города</li>
                                <li><FaStar /> Высокие стандарты контроля качества продуктов</li>
                            </ul>
                        </div>
                    )}

                  
                    {activeNav === 'partner' && (
                        <div className="info-tab-content">
                            <h3>Станьте частью нашей сети</h3>
                            <p>Владеете рестораном или хотите стать курьером? Мы предлагаем выгодные условия сотрудничества.</p>
                            <div className="partner-options">
                                <div className="option">
                                    <h4>Для ресторанов</h4>
                                    <p>Увеличьте свои продажи в 2 раза за счет нашей базы клиентов и службы доставки.</p>
                                </div>
                                <div className="option">
                                    <h4>Для курьеров</h4>
                                    <p>Гибкий график, еженедельные выплаты и бонусы за скорость.</p>
                                </div>
                            </div>
                        </div>
                    )}

                 
                    {activeNav === 'support' && (
                        <div className="info-tab-content">
                            <h3>Нужна помощь?</h3>
                            <p>Наша служба поддержки работает круглосуточно и готова решить любой ваш вопрос.</p>
                            <div className="support-channels">
                                <p><BsFillTelephoneFill /> Телефон: <strong>+996 (705) 06-60-86</strong></p>
                                <p><MdAttachEmail /> Email: <strong>support@ordery.kg</strong></p>
                                <p> <IoLogoWhatsapp /> WhatsApp: <strong>24/7 чат с оператором</strong></p>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default Questions;