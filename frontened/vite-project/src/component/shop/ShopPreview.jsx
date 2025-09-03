import React from "react";
import styles from "../../style/style";
import ShopInfo from "./ShopInfo";
import ShopProfileData from "./ShoProfileData";

const ShopPreview = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full md:flex py-10 justify-between">
        <div className="md:w-[25%] md:overflow-y-scroll  shadow-sm rounded-[4px] bg-[#fff] md:h-[90vh] md:sticky top-10 left-0 z-10">
          <ShopInfo />
        </div>

        <div className="md:w-[72%] mt-5 md:mt-['unset'] rounded-[4px] ">
          <ShopProfileData />
        </div>
      </div>
    </div>
  );
};

export default ShopPreview;
