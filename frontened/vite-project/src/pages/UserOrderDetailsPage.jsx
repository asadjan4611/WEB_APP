import React from 'react'
import Header from '../component/layout/Header'
import Footer from '../component/layout/Footer'
import UserOrderDetail from "../component/UserOrderDetail"
const UserOrderDetailsPage = () => {
  return (
    <div>
       <Header/>
        <UserOrderDetail/> 
       <Footer/>
    </div>
  )
}

export default UserOrderDetailsPage
