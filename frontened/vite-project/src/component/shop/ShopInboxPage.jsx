 import React from 'react'
import DashoardHeader from '../ShopComponents/layout/DashoardHeader'
import DashboarSideBar from '../ShopComponents/layout/DashboarSideBar'
import  DashboardMessages from "../ShopComponents/DashboardMessages.jsx";
 const ShopInboxPage = () => {
   return (
     <div>
          <DashoardHeader/>
          <div className="flex justify-between w-full">
            <div className=' w-[80px] md:w-[230px]'>
             <DashboarSideBar active={8}/>
            </div>

            <div className='flex justify-center w-full'>
              <DashboardMessages/>
            </div>
          </div>
        </div>
   )
 }
 
 export default ShopInboxPage
 