import React from 'react'
import Header from '../component/layout/Header'
import Footer from '../component/layout/Footer'
import Lottie from "react-lottie";
import animationData from "../assets/animations/107043-success.json"
const OrderSucessPage = () => {
  return (
    <div>
        <Header/>
        <Suscess/>
        <Footer/>
    </div>
  )
}

const Suscess =() =>{
    const defaultoptions ={
        loop:false,
        autoplay:true,
        animationData:animationData,
        renderSetting:{
            preserveAspectRatio:"xMidYMid slice"
        }
    }
 return (
     <div>
        <Lottie options={defaultoptions} width={300} height={300}/>
            
         <h5 className='text-center  mb-14 text-[25px] text-[#000000a1]'>
           Your order is sucessfull Congratulation!!!!
         </h5>
     </div>
 );
}

export default OrderSucessPage
