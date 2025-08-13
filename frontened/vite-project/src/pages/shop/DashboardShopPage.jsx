import React, { useState } from 'react'
 import DashoardHeader from "../../component/ShopComponents/layout/DashoardHeader"
 import DashboarSideBar from "../../component/ShopComponents/layout/DashboarSideBar.jsx"

const DashboardShopPage = () => {
  const [active,setActive]= useState(1);
  return (
    <div>
      <DashoardHeader/>
      <div className="flex item-center justify-between w-full">
        <div className=' w-[80px] md:w-[230px]'>
         <DashboarSideBar active={active}/>
        </div>
      </div>
    </div>
  )
}

export default DashboardShopPage
