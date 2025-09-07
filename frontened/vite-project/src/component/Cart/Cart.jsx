import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../style/style";
import { useDispatch, useSelector } from "react-redux";
import { backned_Url } from "../../serverRoute";
import { addToCart, removeFromCart } from "../../assets/redux/actions/cart";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const totalPrice =
    cart.reduce((acc, item) => {
      // console.log(item);
      return  acc + item.count * item.discountPrice
    },0);
 

    // console.log(totalPrice)
  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };

  const removeFromCartController = (data) => {
    dispatch(removeFromCart(data));
  };

  return (
    <div className="fixed bg-[#0000004b] top-0 right-0 w-full h-screen z-10">
      <div className=" flex flex-col  justify-between  shadow-sm w-[25%] fixed top-0 right-0 min-h-full bg-white">
          
          {
            cart && cart.length == 0  ? (
               <div className=" w-full h-screen flex items-center justify-center "> 
               <div className="flex w-full justify-end pr-5 pt-5 fixed top-3 right-3">
                  <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={()=>setOpenCart(false)}
                  />
               </div>
               <div>
                <h5>
                   Cart is  empty
                </h5>
               </div>
               </div>
            ) :(
               <div>
          <div className=" flex pt-5 pr-3 w-full  justify-end cursor-pointer  ">
            <RxCross1 size={25} onClick={() => setOpenCart(false)} />
          </div>

          {/* Items length */}
          <div className={`${styles.noramlFlex} p-2`}>
            <IoBagHandleOutline size={25} />
            <h1 className="pl-2 text-[20px] font-[500]">{cart && cart.length} Items</h1>
          </div>

          {/* card single items */}
          <br />
          <div className="w-full border-t">
            {cart &&
              cart.map((i, index) => (
                <CartSingle
                  key={index}
                  data={i}
                  quantityChangeHandler={quantityChangeHandler}
                  removeFromCartController={removeFromCartController}
                />
              ))}
          </div>

          <div className="px-5 mt-6">
            {/* check out logic */}
            <Link to={"/checkout"}>
              <div className="h-[45px] flex items-center justify-center w-[100%]  bg-[#e44343] rounded-[5px]">
                <h1 className="text- text-[18px] font-[600]">
                  {/* CheckOut Now(USD${totalPrice}) */}
                  ${totalPrice}
                </h1>
              </div>
            </Link>
          </div>
        </div>
            )
          } 
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler,removeFromCartController  }) => {
  const [value, setValue] = useState(data.count);
  const totalPrice = data.discountPrice * value;
  // console.log(totalPrice)
  const increament = (data) => {
     if (data.stock<value) {
      toast.error("Product is out of Stock")
    } else {
      setValue(value + 1);
    const updateCartUpadte = { ...data, count: value + 1 };
      quantityChangeHandler(updateCartUpadte)
    }
  };

  const decrement = (data) => {
    const newValue = Math.max(1,value-1)
   setValue(newValue);
    const updateCartUpadte = { ...data, count: value - 1 };
    quantityChangeHandler(updateCartUpadte);
  };
  return (
    <div className="border-b p-2.5">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-center mr-4">

          {/* increament */}
          <div
            onClick={() => increament(data)}
            className={`justify-center cursor-pointer ${styles.noramlFlex} bg-[#e44343] border-[#e4434373] rounded-full w-[25px] h-[25px]`}
          >
            <HiPlus size={25} />
          </div>
          {/* decrement */}
          <span className="p-2 text-[20px] pl-[10px]">{data.count}</span>
          <div
            onClick={() => decrement(data)}
            className="bg-[#a7abb14f] h-[25px] w-[25px] flex justify-center items-center cursor-pointer"
          >
            <HiOutlineMinus size={25} />
          </div>
        </div>

        <img
          src={`${backned_Url}/uploads/${data.images[0]}`}
          className="w-[80px] h-[80px] ml-2 object-cover"
          alt=""
        />

        <div className="pl-[15px]">
          <h1>{data.name}</h1>
          <h2 className="font-[400] text-[15px] text-gray-500">
            {data.discountPrice} * {value}
          </h2>
          <h3 className="font-[600] text-[17px] pt-[3px] text-[#d02222]">
            US {totalPrice}
          </h3>
        </div>

        <RxCross1
        size={15}
          onClick={() =>  removeFromCartController(data)}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Cart;
