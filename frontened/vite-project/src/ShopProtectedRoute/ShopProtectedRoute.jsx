import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import Cookies from "js-cookie";


const ShopProtectedRoute =({children})=>{
   const seller_token = Cookies.get("seller_token");
    // const {isSeller,isLoading} =useSelector((state)=>state.seller);
    if (!seller_token) {
      return <Navigate to={"/shop-login"} replace/>
    }
    return children ;
  }

export default ShopProtectedRoute;