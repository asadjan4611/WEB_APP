import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import styles from "../../style/style";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishList } from "../../assets/redux/actions/wishList";
import { addToCart } from "../../assets/redux/actions/cart";
import { toast } from "react-toastify";

const WishList = ({ setOpenWishList }) => {
  const { wishList } = useSelector((state) => state.wishList);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    dispatch(addToCart(data));
    toast.success("Product added to cart!");
  };

  const removeWishListHandler = (data) => {
    dispatch(removeFromWishList(data));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
      <div className="w-[90%] sm:w-[70%] md:w-[40%] lg:w-[30%] h-full bg-white shadow-xl flex flex-col transition-all duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <AiFillHeart size={25} color="red" />
            <h1 className="text-lg font-semibold">
              Wishlist ({wishList?.length || 0})
            </h1>
          </div>
          <RxCross1
            size={24}
            className="cursor-pointer hover:rotate-90 transition-transform duration-200"
            onClick={() => setOpenWishList(false)}
          />
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto">
          {wishList && wishList.length > 0 ? (
            wishList.map((item, index) => (
              <CartSingle
                key={index}
                data={item}
                removeWishListHandler={removeWishListHandler}
                addToCartHandler={addToCartHandler}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <AiFillHeart size={60} className="mb-3 text-gray-400" />
              <h2 className="text-lg font-medium">Your wishlist is empty</h2>
              <p className="text-sm">Start adding items you love 💖</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeWishListHandler, addToCartHandler }) => {
  return (
    <div className="flex items-center gap-4 p-4 border-b hover:bg-gray-50 transition">
      
      {/* Remove Button */}
      <RxCross1
        size={20}
        className="cursor-pointer text-gray-500 hover:text-red-500"
        onClick={() => removeWishListHandler(data)}
      />

      {/* Product Image */}
      <img
        src={`${data.images[0].url}`}
        className="w-[70px] h-[70px] object-cover rounded-lg border"
        alt={data.name}
      />

      {/* Product Info */}
      <div className="flex-1">
        <h1 className="text-sm font-medium text-gray-800 truncate">
          {data.name}
        </h1>
        <h3 className="font-semibold text-[15px] text-red-500 mt-1">
          US$ {data.discountPrice}
        </h3>
      </div>

      {/* Add to Cart */}
      <BsCartPlus
        size={22}
        onClick={() => addToCartHandler(data)}
        className="cursor-pointer text-gray-600 hover:text-green-600 transition"
        title="Add to Cart"
      />
    </div>
  );
};

export default WishList;
