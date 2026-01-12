import React from 'react'
import './Hero-section.css'
import gerl from '../../assets/gerls.png'

const mockupsData = [
    {
        id: 1,
        // Используем HTML для вставки иконки, если она нужна
        headerText: "We've Received your order!",
        detailText: "Awaiting Restaurant acceptance",
        notificationClass: "status-1"
    },
    {
        id: 2,
        headerText: 'Order Accepted! <i class="fas fa-check-circle check-icon"></i>',
        detailText: "Your order will be delivered shortly",
        notificationClass: "status-2"
    },
    {
        id: 3,
        headerText: `Your rider's nearby <i class="fas fa-motorcycle rider-icon"></i>`,
        detailText: "They're almost there - get ready!",
        notificationClass: "status-3"
    }
];


const OrderStatusMockup = ({ headerText, detailText, notificationClass }) => {

    return (
        <div className={`status-notification ${notificationClass}`}>
            <div className="order-header">
                Order<span className="now">now</span>
            </div>

            <p dangerouslySetInnerHTML={{ __html: headerText }} />
            <p className="detail">{detailText}</p>
        </div>
    );
};


function Hersection() {


    const handleSubmit = (e) => {
        e.preventDefault();

        const postcode = e.target.elements.postcode.value;
        alert(`Ищем рестораны по индексу: ${postcode}`);
    };
    return (
        <main className="hero-section">


            <div className="blok-hero">
                <div className="hero-content">
                    <p className="pre-header">Order Restaurant food, takeaway and groceries.</p>

                    <h1 className="main-headline">
                        Feast Your <br />Senses,<br />
                        <span className="highlight">Fast and <br /> Fresh</span>
                    </h1>


                    <>
                        <p className="cta-text">Enter a postcode to see what we deliver</p>

                        <form className="search-form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="postcode"
                                placeholder="e.g. EC4R 3TE"
                                className="postcode-input"
                                aria-label="Enter postcode"
                            />
                            <button type="submit" className="search-btn">Search</button>
                        </form>
                    </>
                </div>


                <div className="hero-visuals">
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
        </main>
    )
}

export default Hersection
