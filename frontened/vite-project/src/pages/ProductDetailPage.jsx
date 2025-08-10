import React, { useEffect, useState } from 'react'
import SuggestedProducts from "../component/product/SuggestedProducts.jsx";
import ProductDetail from "../component/product/ProductDetail.jsx";
import Header from '../component/layout/Header.jsx';
import Footer from '../component/layout/Footer.jsx';
import { useParams } from 'react-router-dom';
import { productData } from '../static/data.jsx';
const ProductDetailPage = () => {
    const {name}  = useParams();
     const [data,setData] = useState(null);
     const productName= name.replace(/-/g," ");


     useEffect(()=>{
         const dataa = productData.find((i)=> i.name === productName );
         setData(dataa)
     },[]);
  return (
    <div>
      <Header/>
      <ProductDetail data={data}/>
      <SuggestedProducts data={data}/>
      <Footer/>
    </div>
  )
}

export default ProductDetailPage
