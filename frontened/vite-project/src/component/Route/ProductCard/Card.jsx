
//event Card

import React from "react";
import styles from "../../../style/style";
import CountDown from "../CountDown/CountDown";
import { backned_Url } from "../../../serverRoute";
import { Link } from "react-router-dom";
const Card = ({data}) => {
  console.log("data  is",data);
  return (
    <>
      <div className={`w-full p-2 bg-white ${active? "unset":"mb-12"} block lg:flex`}>
        <div className="w-full lg:w-[50%] m-auto">
          {/* <img
            src={`${backned_Url}/uploads/${data.images[0]}`}
            alt=""
          /> */}
        </div>
        <div className="w-full lg:w-[50%] flex flex-col justify-center ">
          <h2 className={`${styles.productTitle}`}>{data.name}</h2>
          <p className="text-[15px] mt-3 mr-4">
           {data.description}
          </p>
          <div className="flex py-2 justify-between">
            <div className="flex">

            <h3 className="font-[500] text-[18px]  text-[#d55b45] pr-3 line-through">
             {data.originalPrice}
            </h3>

            <h4 className="font-bold text-[20px] text-[#333] ">
                {data.discountPrice}
            </h4>
            </div>
            <span className="pr-3 font-[400] text-[17px]  text-[#44a55e]">{data.sold_out} sold</span>
          </div>
          <CountDown data={data}/>

           <div className="flex items-center">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-[18px] text-white`}>See Details</div>
          </Link>
          <div
            className={`${styles.button} text-[18px] !font-[700px]  text-white ml-5`}
          >
            Add to Cart
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Card;
