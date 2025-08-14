import React from 'react'
import styles from '../../style/style'
import ShopInfo  from "../../component/shop/ShopInfo.jsx"
import ShoProfileData  from "../../component/shop/ShoProfileData.jsx"

const ShopHomePage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
   <div className="w-full flex py-10 justify-between">
    <div className='w-[28%] bg-[#fff] shadow-sm not-only-of-type:overflow-y-scroll h-screen sticky top-2 left-0 z-10'>
      <ShopInfo isOwner={true}/>
    </div>
    <div className='w-[75%] rouded-[4px]'>
      <ShoProfileData isOwner={true}/>
    </div>
    </div>   
    </div>
  )
}

export default ShopHomePage
