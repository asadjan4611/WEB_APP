import React, { useEffect, useState } from 'react'
import { productData } from '../../../static/data';
import styles from '../../../style/style';
import ProductCard from "../ProductCard/ProductCard"
import { useSelector } from 'react-redux';
const BestDeals = () => {
  const {allproducts} = useSelector((state)=>state.products);
  // console.log(allproducts)
    const [data,setData] = useState();

    useEffect(()=>{
    // const d= productData && productData.sort((a,b)=>b.total_sell-a.total_sell);
    const d= allproducts && [...allproducts].sort((a,b)=>b.sold_out-a.sold_out);

    const firstfive = d.slice(0,5);
    setData(firstfive);
    },[])
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading} font-bold`}>
          <h1>Best Deals</h1>
        </div>
     <div className="grid grid-cols  gap-[25px] md:grid-cols-2 md:gap-[20px] lg:grid-cols-4 lg:gap-[30px] xl:grid-cols-5 xl:gap-[4 0px]" >
           {
            data && data.map((i,index)=>{
              //  console.log(i);
             return  <ProductCard data={i} key={index}/>
            })
           }
           </div>
      </div>
    </div>
  )
}

export default BestDeals
