import React, { useState } from "react";
import {Link  } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../style/style";

const Cart = ({ setOpenCart }) => {




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
      price: 280
    },
    {
      name: "Iphone 14 Pro Max with 256 RAM",
      description: "test",
      price: 300
    },
  ];
  return (
    <div className="fixed bg-[#0000004b] top-0 right-0 w-full h-screen z-10">
      <div className=" flex flex-col  justify-between  shadow-sm w-[25%] fixed top-0 right-0 min-h-full bg-white">
        <div>

       
        <div className=" flex pt-5 pr-3 w-full  justify-end cursor-pointer  ">
          <RxCross1 size={25} onClick={() => setOpenCart(false)} />
        </div>

        {/* Items length */}
        <div className={`${styles.noramlFlex} p-2`}>
          <IoBagHandleOutline size={25} />
          <h1 className="pl-2 text-[20px] font-[500]">3 Items</h1>
        </div>

        {/* card single items */}
        <br />
        <div className="w-full border-t">
          {
          cartData &&
            cartData.map((i, index) => <CartSingle key={index} data={i} />)
            }
        </div>
        
      <div className="px-5 mt-6">
        {/* check out logic */}
       <Link to={"/checkout"}>
       <div className="h-[45px] flex items-center justify-center w-[100%]  bg-[#e44343] rounded-[5px]">
         <h1 className="text- text-[18px] font-[600]">
          CheckOut Now(USD$1000)
         </h1>
       </div>
       </Link>

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
        <div className="flex flex-col items-center mr-4">
          <div
            onClick={() => setValue(value + 1)}
            className={`justify-center cursor-pointer ${styles.noramlFlex} bg-[#e44343] border-[#e4434373] rounded-full w-[25px] h-[25px]`}
          >
            <HiPlus size={25} />
          </div>
          <span className="p-2 text-[20px] pl-[10px]">{value}</span>
          <div
            onClick={() => setValue(value === 1 ? 1 : value - 1)}
            className="bg-[#a7abb14f] h-[25px] w-[25px] flex justify-center items-center cursor-pointer"
          >
            <HiOutlineMinus size={25} />
          </div>
        </div>

        <img
          src="https://plus.unsplash.com/premium_photo-1673356301535-2cc45bcc79e4?w=600"
          className="w-[80px] h-[80px] ml-2"
          alt=""
        />

        <div className="pl-[15px]">
          <h1>{data.name}</h1>
          <h2 className="font-[400] text-[15px] text-gray-500">
            {data.price} * {value}
          </h2>
          <h3 className="font-[600] text-[17px] pt-[3px] text-[#d02222]">
           US {totalPrice}
          </h3>
        </div>

        <RxCross1 className="cursor-pointer"/>
      </div>
    </div>
  );
};

export default Cart;
