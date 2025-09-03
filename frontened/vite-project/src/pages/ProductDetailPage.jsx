import React, { useEffect, useState } from "react";
import SuggestedProducts from "../component/product/SuggestedProducts.jsx";
import ProductDetail from "../component/product/ProductDetail.jsx";
import Header from "../component/layout/Header.jsx";
import Footer from "../component/layout/Footer.jsx";
import { useParams } from "react-router-dom";
import { productData } from "../static/data.jsx";
import { useSelector } from "react-redux";
import Loader from "../component/layout/loader.jsx";
const ProductDetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  // console.log(name)
  const { allproducts } = useSelector((state) => state.products);

  useEffect(() => {
    const dataa = allproducts.find((i) => i._id === id);
    // console.log("data is ", dataa);
    setData(dataa);
  }, [allproducts]);
  // console.log("main data is ", data);
return (
  <div>
    <Header />
    {data ? (
      <>
        <ProductDetail data={data} />
        <SuggestedProducts data={data} />
      </>
    ) : (
      <Loader/>
    )}
    <Footer />
  </div>
);

};

export default ProductDetailPage;
