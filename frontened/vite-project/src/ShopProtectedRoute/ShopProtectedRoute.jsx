import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../component/layout/loader";

const ShopProtectedRoute = ({ children }) => {
  const { isSeller, isLoading } = useSelector((state) => state.seller);

  if (isLoading) {
    return <Loader />;
  }

  if (isSeller) {
    return children;
  }

  return <Navigate to="/shop-login" replace />;
};


export default ShopProtectedRoute