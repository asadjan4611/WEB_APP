import React, { useEffect, useState } from 'react';
import styles from '../../../style/style';
import ProductCard from "../ProductCard/ProductCard";
import { useSelector } from 'react-redux';

const BestDeals = () => {
  const { allproducts } = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (allproducts) {
      const sorted = [...allproducts].sort((a, b) => b.sold_out - a.sold_out);
      const firstFive = sorted.slice(0, 5);
      setData(firstFive);
    }
  }, [allproducts]);

  return (
    <div className={`${styles.section} my-12`}>
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 relative inline-block">
          Best Deals
          <span className="block h-[3px] w-12 bg-pink-500 rounded-full mx-auto mt-2"></span>
        </h1>
        <p className="text-gray-500 text-sm md:text-base mt-2">
          Top-selling products handpicked just for you
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {data && data.length > 0 ? (
          data.map((product, index) => (
            <div 
              key={index} 
              className="transition transform hover:scale-105 duration-300"
            >
              <ProductCard data={product} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No best deals available right now.
          </p>
        )}
      </div>
    </div>
  );
};

export default BestDeals;
