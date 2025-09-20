import React, { useEffect, useState } from "react";
import styles from "../../style/style";
import ProductCard from "../Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import { AiOutlineFire } from "react-icons/ai";

const SuggestedProducts = ({ data }) => {
  const [products, setProducts] = useState([]);
  const { allproducts } = useSelector((state) => state.products);

  useEffect(() => {
    if (allproducts && data?.category) {
      const related = allproducts.filter(
        (item) =>
          item.category === data.category && item._id !== data._id // avoid showing same product
      );
      setProducts(related);
    }
  }, [allproducts, data]);

  return (
    <div className={`${styles.section} mt-10`}>
      {data && (
        <>
          {/* Heading */}
          <div className="flex items-center gap-2 mb-6">
            <AiOutlineFire className="text-red-500 text-2xl" />
            <h2 className="text-2xl font-semibold text-gray-900 relative">
              Related Products
              <span className="absolute bottom-0 left-0 w-1/2 h-[3px] bg-gradient-to-r from-red-500 to-orange-400 rounded"></span>
            </h2>
          </div>

          {/* Grid */}
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {products.map((item, index) => (
                <div
                  key={index}
                  className="transform transition duration-300 hover:scale-105"
                >
                  <ProductCard data={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-lg mt-10 text-center">
              No related products found.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SuggestedProducts;
