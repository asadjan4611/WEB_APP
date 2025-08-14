import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import Cookies from "js-cookie";
import  Loader from "../component/layout/loader.jsx"


const ShopProtectedRoute =({children})=>{
  //  const seller_token = Cookies.get("seller_token");
  //   // const {isSeller,isLoading} =useSelector((state)=>state.seller);
  //   if (!seller_token) {
  //     return <Navigate to={"/shop-login"} replace/>
  //   }
  //   return children ;



  const {isSeller,isLoading} = useSelector((state)=>state.seller);

  if (isLoading === true) {
    return <Loader/>
  }else{
    if (!isSeller) {
       return <Navigate to={'/shop-login'} replace/>
    }
    return children;
  }
  }

export default ShopProtectedRoute;