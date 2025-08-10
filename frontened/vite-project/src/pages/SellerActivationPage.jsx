import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const  SellerActivationPage = () => {
    const {activation_token} = useParams();
    const [error,setError] = useState(false);
   useEffect(()=>{
    if (activation_token) {
        const activationEmail =async()=>{
               try {
                setError(false);
                const res =await axios.post(`http://localhost:8000/api/shop/seller/activation`,{
                    activation_token
                });
                if (res.data.success === false) {
                    setError(true);
                }
                console.log(res);
               } catch (error) {
                console.log(error.response.data.message);
                setError(true)
               }
        }
        activationEmail();
    }
    
   },[activation_token]);
    return (
    <div style={
        {
           width:"100%",
           height:"100vh",
           display:"flex",
            justifyContent:"center",
            alignItems:"center"
        }
    }>{
        error ? (
            <p>Your token is expired!</p>
        ) : (
            <p>Your account is successfully created!</p>
        )
    }
       
    </div>
  )
}

export default SellerActivationPage
