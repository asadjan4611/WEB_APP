import React, { useEffect, useState } from "react";
import Header from "../component/layout/Header";
import styles from "../style/style";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../component/Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";

const ProductsPage = () => {
  const { allproducts } = useSelector((state) => state.products);
  const [searchParams] = useSearchParams();
  const categoriesData = searchParams.get("category");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoriesData === null) {
      const d =
        allproducts && [...allproducts].sort((a, b) => b.sold_out - a.sold_out);
      setData(d);
    } else {
      const d =
        allproducts &&
        allproducts.filter((i) => i.category === categoriesData);
      setData(d);
    }

    window.scrollTo(0, 0); // optional: scroll to top on category change
  }, [categoriesData, allproducts]); // 👈 important

  return (
    <div>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[20px] lg:grid-cols-4 lg:gap-[30px] xl:grid-cols-5 xl:gap-[40px]">
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
