import React, { useEffect } from 'react'
import ShopLogin from "../../pages/ShopLogin.jsx"
import ShopCreate from "../../pages/ShopCreat.jsx"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ShopLoginPage = () => {
  const navigate=useNavigate();
    const {isSeller,isLoading} = useSelector((state)=>state.seller);
    useEffect(()=>{
       if (isSeller === true) {
        navigate(`/dashboard`);
       }
    },[isLoading,isSeller]);
  return (
    <div>
      <ShopCreate/>
    </div>
  )
}

export default ShopLoginPage
