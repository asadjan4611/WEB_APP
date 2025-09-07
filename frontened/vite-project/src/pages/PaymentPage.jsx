import React from 'react'
import Header from '../component/layout/Header'
import Footer from '../component/layout/Footer'
import CheckoutSteps from '../component/CheckOut/CheckOutStep'
import  Payment from "../component/Payment/Payment"
const PaymentPage = () => {
  return (
    <div>
    <Header/>
    <br />
    <br />
    <CheckoutSteps active={2}/>
    <Payment/>
    <br />
    <br />
    <Footer/>
    </div>
  )
}

export default PaymentPage
