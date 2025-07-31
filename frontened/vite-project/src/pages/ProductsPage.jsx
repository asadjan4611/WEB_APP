import React, { useEffect, useState } from "react";
import Header from "../component/layout/Header";
import styles from "../style/style";
import { useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import ProductCard from "../component/Route/ProductCard/ProductCard";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  //  console.log(" your searchParams is ",searchParams);
  const categoriesData = searchParams.get("category");
  const [data, setData] = useState([]);
  // console.log("your data is ",data)
  //  console.log("your categories data is ",categoriesData)

  useEffect(() => {
    if (categoriesData === null) {
      const d =
        productData && productData.sort((a, b) => b.total_sell - a.total_sell);

      setData(d);
    } else {
      const d =
        productData && productData.filter((i) => i.category === categoriesData);
      setData(d);
    }
    // window.scrollTo(0,0);
  }, []);

  return (
    <div>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1  gap-[25px] md:grid-cols-2 md:gap-[20px] lg:grid-cols-4 lg:gap-[30px] xl:grid-cols-5 xl:gap-[4 0px]">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-[15px] font-[500] text-center w-full">
            No products found!
          </h1>
        ) : null}
      </div>
    </div>
  );
};

export default ProductsPage;
