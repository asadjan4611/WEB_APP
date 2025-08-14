import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { productData } from "../../static/data";
import ProductCard from "../Route/ProductCard/ProductCard";
import styles from "../../style/style";

const ShoProfileData = ({ isOwner }) => {
  const { seller } = useSelector((state) => state.seller);
  const [active, setActive] = useState(1);
  return (
    <div className=" w-full">
      <div className="flex w-full item-center">
        <div
          onClick={() => setActive(1)}
          className="flex items-center cursor-pointer"
        >
          <h5
            className={`${
              active === 1 ? "text-red-500" : "text-[#333]"
            } ml-2 mr-20 font-[600px] text-[20px]`}
          >
            Shop Products
          </h5>
        </div>

        <div
          onClick={() => setActive(2)}
          className="flex items-center cursor-pointer"
        >
          <h5
            className={`${
              active === 2 ? "text-red-500" : "text-[#333]"
            } mr-20 font-[600px] text-[20px]`}
          >
            Running Events
          </h5>
        </div>

        <div
          onClick={() => setActive(3)}
          className="flex items-center cursor-pointer"
        >
          <h5
            className={`${
              active === 3 ? "text-red-500" : "text-[#333]"
            } mr-20 font-[600px] text-[20px]`}
          >
            Shop Reviews
          </h5>
        </div>
        {isOwner && (
          <div>
            <Link to={"/dashboard"}>
              <div
                className={`${styles.button}  !w-[165px] ml-10 !rounded-[5px]`}
              >
                <span className="text-center text-white">Go To Dashboard</span>
              </div>
            </Link>
          </div>
        )}
      </div>

      <br />

      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0 ">
        {productData &&
          productData.map((i, index) => (
            <ProductCard key={index} isShop={true} data={i} />
          ))}
      </div>
    </div>
  );
};

export default ShoProfileData;
