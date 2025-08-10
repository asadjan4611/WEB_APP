import React, { useEffect, useState } from 'react'
import { productData } from '../../static/data';
import styles from '../../style/style';
import ProductCard from '../Route/ProductCard/ProductCard';


const SuggestedProducts = ({data}) => {
      console.log(data?.category)
    const [products,setProducts]=useState(null);
    console.log(products);

    useEffect(()=>{
     const d = productData && productData.filter((i)=>i.category === data?.category)
     setProducts(d);
    },[]);
  return (
    <div>
       {
        data ?(
            <div className={`${styles.section}`}>
             <h2 className={`${styles.heading} text-[25px] font-[500px] mb-3`}>
          Related Products
             </h2>

                  <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[40px] mb-12" >{
                    
                    products && products.map((i,index)=>(
                      // <div><h2>asadjan</h2></div>
                    <ProductCard data={i} key={index}/>
                        
                    ))
                    }


             </div>
            </div>
        ):null
       }
    </div>
  )
}

export default SuggestedProducts

