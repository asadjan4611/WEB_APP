import React from 'react'
import DashboarSideBar from '../ShopComponents/layout/DashboarSideBar'
import DashoardHeader from '../ShopComponents/layout/DashoardHeader'
import AllOrders from "../ShopComponents/AllOrders.jsx"
import AllProducts from '../ShopComponents/AllProducts.jsx'
const DashboardShopOrderPage = () => {
  return (
         <div>
          <DashoardHeader/>
          <div className="flex justify-between w-full">
            <div className=' w-[80px] md:w-[230px]'>
             <DashboarSideBar active={2}/>
            </div>

            <div className='flex justify-center w-full'>
                <AllOrders/>
            </div>
          </div>
        </div>
  )
}

export default DashboardShopOrderPage
