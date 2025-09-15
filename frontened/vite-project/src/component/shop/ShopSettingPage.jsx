import React from "react";
import ShopSetting from "../../component/shop/ShopSetting.jsx";
import Footer from "../layout/Footer.jsx";
import DashoardHeader from "../ShopComponents/layout/DashoardHeader.jsx";
import DashboarSideBar from "../ShopComponents/layout/DashboarSideBar.jsx";

const ShopSettingPage = () => {
  return (
    <div>
      <DashoardHeader />
      <div className="flex item-center justify-between w-full">
        <div className=' w-[80px] md:w-[230px]'>
         <DashboarSideBar active={11}/>
        </div>
        <div className='w-full justify-center flex'>
          <ShopSetting/>
        </div>
        </div>
    </div>
  );
};

export default ShopSettingPage;
