import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline, IoHeartOutline } from "react-icons/io5";
import { BsCart, BsCartPlus } from "react-icons/bs";
import styles from "../../style/style";

const WishList = ({ setOpenWishList }) => {
  const cartData = [
    {
      name: "Iphone 14 Pro Max with 256 RAM",
      description: "test",
      price: 220,
    },
    {
      name: "Iphone 14 Pro Max with 256 RAM",
      description: "test",
      price: 210,
    },
    {
      name: "Iphone 14 Pro Max with 256 RAM",
      description: "test",
      price: 280,
    },
    {
      name: "Iphone 14 Pro Max with 256 RAM",
      description: "test",
      price: 300,
    },
  ];
  return (
    <div className="fixed bg-[#0000004b] top-0 right-0 w-full h-screen z-10">
      <div className=" flex flex-col  justify-between  shadow-sm w-[25%] fixed top-0 right-0 min-h-full bg-white">
        <div>
          <div className=" flex pt-5 pr-3 w-full  justify-end cursor-pointer  ">
            <RxCross1 size={25} onClick={() => setOpenWishList(false)} />
          </div>

          {/* Items length */}
          <div className={`${styles.noramlFlex} p-2`}>
            <IoHeartOutline size={25} />
            <h1 className="pl-2 text-[20px] font-[500]">3 Items</h1>
          </div>

          {/* card single items */}
          <br />
          <div className="w-full border-t">
            {cartData &&
              cartData.map((i, index) => <CartSingle key={index} data={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;

  return (
    <div className="border-b p-2.5">
      <div className="w-full flex items-center">
        <RxCross1 className="cursor-pointer m-2 " />

        <img
          src="https://plus.unsplash.com/premium_photo-1673356301535-2cc45bcc79e4?w=600"
          className="w-[80px] h-[80px] ml-2 rounded-med"
          alt=""
        />

        <div className="pl-[15px]">
          <h1>{data.name}</h1>
          <h3 className="font-[600] text-[17px] pt-[3px] text-[#d02222]">
            US {totalPrice}
          </h3>
        </div>
        <div>
          <BsCartPlus
            size={20}
            title="Add to Cart"
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default WishList;
