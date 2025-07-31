import React from 'react'
import styles from '../../../style/style'
import Cards from "../Card/Card.jsx";
const EventCard = () => {
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
