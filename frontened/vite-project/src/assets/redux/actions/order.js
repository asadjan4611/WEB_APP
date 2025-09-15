

import axios from "axios"
import { backned_Url } from "../../../serverRoute";


 export const getUserOrder= (id)=>async(dispatch)=>{
      try {
         dispatch({
            type:"orderGetRequest"
         })
        const config = {headers:{"Content-type":"application/json"}};
         const {data}=await axios.get(`${backned_Url}/api/order/getOrders/${id}`);
         dispatch({
            type:"orderGetSuccess",
            payload:data.orders
         });
      } catch (error) {
         dispatch({
            type:"orderGetFailure",
            payload:error.response?.data?.message
         });
      }
 }



  export const getSellerOrder= (id)=>async(dispatch)=>{
      try {
         dispatch({
            type:"orderShopGetRequest"
         })
         const {data}= await axios.get(`${backned_Url}/api/order/getShopOrders/${id}`);;
         dispatch({
            type:"orderShopGetSuccess",
            payload:data.orders
         });
      } catch (error) {
         dispatch({
            type:"orderShopGetFailure",
            payload:error.response?.data?.message
         });
      }
 }