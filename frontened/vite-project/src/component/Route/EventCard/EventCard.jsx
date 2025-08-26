import React from 'react'
import styles from '../../../style/style'
import Cards from "../Card/Card.jsx";
import { useSelector } from 'react-redux';
const EventCard = () => {
    const {allproducts}=useSelector((state)=>state.products);
  return (
    <div>
      <div className={`${styles.section} mt-5`}>
        <div className={`${styles.heading}`}>
            <h1>
                Popular Events
            </h1>
            <Cards/>
        </div>
      </div>
    </div>
  )
}

export default EventCard
