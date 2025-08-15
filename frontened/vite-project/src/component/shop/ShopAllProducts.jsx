import React from 'react'
import DashoardHeader from '../ShopComponents/layout/DashoardHeader'
import DashboarSideBar from '../ShopComponents/layout/DashboarSideBar'
import AllProducts from "../ShopComponents/AllProducts"
const ShopAllProducts = () => {
  return (
     <div>
          <DashoardHeader/>
          <div className="flex item-center justify-between w-full">
            <div className=' w-[80px] md:w-[230px]'>
             <DashboarSideBar active={3}/>
            </div>

            <div className='flex justify-center w-full'>
                <AllProducts/>
            </div>
          </div>
        </div>
  )
}

export default ShopAllProducts
