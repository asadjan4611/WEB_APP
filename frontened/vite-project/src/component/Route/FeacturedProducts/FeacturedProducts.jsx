import React from "react";
import styles from "../../../style/style";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const FeacturedProducts = () => {
  const { allproducts } = useSelector((state) => state.products);

  return (
    <div className={`${styles.section} mt-10`}>
      {/* Heading */}
      <div className="flex items-center justify-between mb-6">
        <h1 className={`${styles.heading} text-2xl font-bold text-gray-800`}>
          🌟 Featured Products
        </h1>
        <Link to={"/products"}>
          <span  className="text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition">
          View All →
        </span>
        </Link>
       
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {allproducts &&
          allproducts.map((i, index) => (
            <div
              key={index}
              className="hover:scale-105 transition-transform duration-300"
            >
              <ProductCard data={i} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeacturedProducts;
