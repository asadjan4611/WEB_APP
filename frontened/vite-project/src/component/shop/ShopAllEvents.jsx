import React from 'react'
import DashoardHeader from '../ShopComponents/layout/DashoardHeader'
import DashboarSideBar from '../ShopComponents/layout/DashboarSideBar'
import AllEvents from "../ShopComponents/AllEvents"
const ShopAllEvents = () => {
  return (
     <div>
          <DashoardHeader/>
          <div className="flex justify-between w-full">
            <div className=' w-[80px] md:w-[230px]'>
             <DashboarSideBar active={5}/>
            </div>

            <div className='flex justify-center w-full'>
                <AllEvents/>
            </div>
          </div>
        </div>
  )
}

export default ShopAllEvents
