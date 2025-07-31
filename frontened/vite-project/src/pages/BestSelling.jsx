import React, { useEffect, useState } from 'react'
import Header from '../component/layout/Header'
import { productData } from '../static/data';
import ProductCard from '../component/Route/ProductCard/ProductCard';
import styles from '../style/style';

const BestSelling = () => {
    const [data,setData] = useState([]);
    useEffect(()=>{
      const d = productData && productData.sort((a,b)=>a.total_sell-b.total_sell);
      console.log(d);
      setData(d)
    },[]);
  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1  gap-[25px] md:grid-cols-2 md:gap-[20px] lg:grid-cols-4 lg:gap-[30px] xl:grid-cols-5 xl:gap-[4 0px]">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>
    </div>
  )
}

export default BestSelling
