import React from 'react'
import { Link } from 'react-router-dom';
import HeroSection from '../components/heroSection/HeroSection'
import DealCard from '../components/dealCard/DealCard'
import StatisticsBar from '../components/StatisticsBar/StatisticsBar'
import './Home.css'

function Home() {
  return (
    <div>
      <HeroSection/>
     
      <DealCard/>

      <StatisticsBar/>
    </div>
  )
}

export default Home
