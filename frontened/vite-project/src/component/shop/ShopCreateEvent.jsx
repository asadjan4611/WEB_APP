import React from 'react'
import DashoardHeader from '../ShopComponents/layout/DashoardHeader'
import DashboarSideBar from '../ShopComponents/layout/DashboarSideBar'
import CreateEvent from "./CreateEvent"
const ShopCreateEvent = () => {
  return (
     <div>
          <DashoardHeader/>
          <div className="flex justify-between w-full">
            <div className=' w-[80px] md:w-[230px]'>
             <DashboarSideBar active={6}/>
            </div>

            <div className='flex justify-center w-full'>
                <CreateEvent/>
            </div>
          </div>
        </div>
  )
}

export default ShopCreateEvent
