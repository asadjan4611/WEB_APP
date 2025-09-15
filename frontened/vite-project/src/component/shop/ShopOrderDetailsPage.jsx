import React from "react";
import DashoardHeader from "../ShopComponents/layout/DashoardHeader";
import DashboarSideBar from "../ShopComponents/layout/DashboarSideBar";
import Footer from "../layout/Footer";
import OrderDetails from "./OrdersDetaills";
const ShopOrderPage = () => {
  return (
    <div>
          <DashoardHeader/>
          <OrderDetails/>
          <Footer/>
        </div>
  );
};

export default ShopOrderPage;
