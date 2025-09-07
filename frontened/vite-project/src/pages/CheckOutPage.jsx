import React from 'react'
import CheckOutPagee from "../component/CheckOut/CheckOutPagee.jsx"
import Header from '../component/layout/Header.jsx'
import Footer from '../component/layout/Footer.jsx'
import CheckoutSteps from '../component/CheckOut/CheckOutStep.jsx'
const CheckOutPage = () => {
  return (
    <div>

      <Header/>
      <br />
      <br />
      <CheckoutSteps active={1}/>
       <CheckOutPagee/>
       <br />
       <br />
       <Footer/>
    </div>
  )
}

export default CheckOutPage
