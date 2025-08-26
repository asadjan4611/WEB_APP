import React from 'react'
import DashboarSideBar from '../ShopComponents/layout/DashboarSideBar'
import DashoardHeader from '../ShopComponents/layout/DashoardHeader'
import AllCoupans from '../ShopComponents/AllCoupans'

const CouponCode = () => {
  return (
     <div>
          <DashoardHeader/>
          <div className="flex justify-between w-full">
            <div className=' w-[80px] md:w-[230px]'>
             <DashboarSideBar active={9}/>
            </div>

            <div className='flex justify-center w-full'>
                <AllCoupans/>
            </div>
          </div>
        </div>
  )
}

export default CouponCode
