import React from 'react'
import styles from '../../../style/style'
import { productData } from '../../../static/data'
import ProductCard from '../ProductCard/ProductCard'
const FeacturedProducts = () => {
  return (
    <div className={`${styles.section} mt-5`}>
     <div className={`${styles.heading}`}>
        <h1>Featured Products</h1>
        </div>  
     <div className="grid grid-cols  gap-[25px] md:grid-cols-2 md:gap-[20px] lg:grid-cols-4 lg:gap-[30px] xl:grid-cols-5 xl:gap-[40px]" >
    {
        productData && productData.map((i,index)=>{
             return  <ProductCard data={i} key={index}/>
        })
    }
     </div>
    </div>
  )
}

export default FeacturedProducts
