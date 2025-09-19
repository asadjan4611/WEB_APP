import React from 'react'
import DashoardHeader from '../ShopComponents/layout/DashoardHeader'
import DashboarSideBar from '../ShopComponents/layout/DashboarSideBar'
import WithDrawMoney from "../ShopComponents/WithDrawMoney.jsx"
const ShopWithDrawMoney = () => {
  return (
   <div>
             <DashoardHeader/>
             <div className="flex justify-between w-full">
               <div className=' w-[80px] md:w-[230px]'>
                <DashboarSideBar active={7}/>
               </div>
   
               <div className='flex justify-center w-full'>
                   <WithDrawMoney/>
               </div>
             </div>
           </div>
  )
}

export default ShopWithDrawMoney
