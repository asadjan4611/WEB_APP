import React from 'react'
import { BiHeading } from 'react-icons/bi'
import Header from '../component/layout/Header'
import styles from '../style/style'
import Card from '../component/Route/Card/Card'


const EventPage = () => {
  return (
    <div>
      <Header/>
      <Card  active={true}/>
       <Card  active={true}/>
       <div className={`${styles.section}`}>

       </div>
    </div>
  )
}

export default EventPage
