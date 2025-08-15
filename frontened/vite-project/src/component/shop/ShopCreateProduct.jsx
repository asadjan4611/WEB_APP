import React from 'react'
import CreateProduct from '../../component/shop/CreateProduct'
import DashoardHeader from '../ShopComponents/layout/DashoardHeader'
import DashboarSideBar from '../ShopComponents/layout/DashboarSideBar'
const ShopCreateProduct = () => {
  return (
    <div>
       <DashoardHeader/>
       <div className="flex item-center justify-between w-full">
        <div className=' w-[80px] md:w-[230px]'>
         <DashboarSideBar active={4}/>
        </div>
        <div className='w-full justify-center flex'>
          <CreateProduct/>
        </div>
        </div>
    </div>
  )
}

export default ShopCreateProduct
