import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline, IoHeartOutline } from "react-icons/io5";
import { BsCart, BsCartPlus } from "react-icons/bs";
import styles from "../../style/style";
import { useDispatch, useSelector } from "react-redux";
import { backned_Url } from "../../serverRoute";
import { removeFromWishList } from "../../assets/redux/actions/wishList";
import { AiFillHeart } from "react-icons/ai";
import { addToCart } from "../../assets/redux/actions/cart";
import { toast } from "react-toastify";

const WishList = ({ setOpenWishList }) => {
  const { wishList } = useSelector((state) => state.wishList);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const addToCartHandler =(data)=>{
     dispatch(addToCart(data))
     toast.success("Product is add to cart")
  }

  const removeWishListHandler = (data) => {
    console.log(data);
    dispatch(removeFromWishList(data));
  };

  
  return (
    <div className="fixed bg-[#0000004b] top-0 right-0 w-full h-screen z-10">
      <div className=" flex flex-col  justify-between  shadow-sm w-[25%] fixed top-0 right-0 min-h-full bg-white">
        {wishList && wishList.length > 0 ? (
          <div>
            <div className=" flex pt-5 pr-3 w-full  justify-end cursor-pointer  ">
              <RxCross1 size={25} onClick={() => setOpenWishList(false)} />
            </div>

            {/* Items length */}
            <div className={`${styles.noramlFlex} p-2`}>
              <AiFillHeart color="red" size={25} />
              <h1 className="pl-2 text-[20px] font-[500]">{wishList.length} Items</h1>
            </div>

            {/* card single items */}
            <br />
            <div className="w-full border-t">
              {wishList &&
                wishList.map((i, index) => (
                  <CartSingle
                    key={index}
                    data={i}
                    removeWishListHandler={removeWishListHandler}
                    addToCartHandler={addToCartHandler}
                  />
                ))}
            </div>
          </div>
        ) : (
          <div className=" w-full h-screen flex items-center justify-center ">
            <div className="flex w-full justify-end pr-5 pt-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishList(false)}
              />
            </div>
            <div>
              <h5>WishList is empty</h5>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeWishListHandler ,addToCartHandler}) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="border-b p-2.5">
      <div
        onClick={() => removeWishListHandler(data)}
        className="w-full flex items-center justify-between"
      >
        <RxCross1 className="cursor-pointer m-2 " />

        <img
          src={`${backned_Url}/uploads/${data.images[0]}`}
          className="w-[80px] h-[80px] ml-2  object-fit rounded-med"
          alt=""
        />

        <div className="pl-[15px]">
          <h1>{data.name}</h1>
          <h3 className="font-[600] text-[17px] pt-[3px] text-[#d02222]">
            US$ {totalPrice}
          </h3>
        </div>
        <div>
          <BsCartPlus
            size={20}
            onClick={()=>{addToCartHandler(data)}}
            title="Add to Cart"
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default WishList;
