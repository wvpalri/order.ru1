import React from 'react'
import './Ordering.css'
import app from '../../assets/appstore.png'
import google from '../../assets/google.png'
import person from '../../assets/personaliti.png'
import fem from '../../assets/family.png'
function Ordering() {
  return (
    <div className='ordering-section'>
        <div className="ordering-more">
       <h1 className='ord-more'>Ordering is more</h1>
      <div className="instant">
        <img src={person} alt="" />
      </div>
            <p>Download the Order.uk app for faster ordering</p>
             <div className="app-links">
         <div className="app">
               <a href=""><img src={app} alt="" /></a>
         </div>
           <div className="google">
             <a href=""><img src={google} alt="" /></a>
           </div>
        </div>
        </div>
        <div className="photo-ordering">
            <img src={fem} alt="" />
        </div>

       

       
      
    </div>
  )
}

export default Ordering
