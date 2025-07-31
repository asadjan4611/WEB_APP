import React from 'react'
import Header from '../component/layout/Header'
import Hero from "../component/Route/Hero/Hero";
import Categories from "../component/Route/Categories/Categories";
import BestDeals from "../component/Route/BestDeals/BestDeals"
import FeacturedProducts from "../component/Route/FeacturedProducts/FeacturedProducts"
import EventCard from "../component/Route/EventCard/EventCard";
import Sponsered from "../component/Route/Sponsered/Sponsered"
import Footer from "../component/layout/Footer"
const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1}/>
      <Hero/>
      <Categories/>
      <BestDeals/>
      <EventCard/>
      <FeacturedProducts/>
      <Sponsered/>
      <Footer/>
    </div>
  )
}

export default HomePage
