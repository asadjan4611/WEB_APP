import React from 'react'
import { BiHeading } from 'react-icons/bi'
import Header from '../component/layout/Header'
import styles from '../style/style'
import Card from '../component/Route/Card/Card'
import Loader from '../component/layout/loader'
import { useSelector } from 'react-redux'


const EventPage = () => {
  const {allevents,isLoading}= useSelector((state)=>state.events);

  return (
    <>
    {
      isLoading ? <Loader/> :
    
    <div>
      <Header/>
       <Card  active={true} data ={allevents && allevents[0]}/>
       <div className={`${styles.section}`}>

       </div>
    </div>
}
    </>
  )
}

export default EventPage
