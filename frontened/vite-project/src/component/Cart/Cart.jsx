import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../style/style";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../assets/redux/actions/cart";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.count * item.discountPrice;
  }, 0);

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };

  const removeFromCartController = (data) => {
    dispatch(removeFromCart(data));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
      <div className="w-[90%] sm:w-[70%] md:w-[40%] lg:w-[30%] h-full bg-white shadow-xl flex flex-col transition-all duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <IoBagHandleOutline size={25} />
            <h1 className="text-lg font-semibold">
              Cart ({cart?.length || 0})
            </h1>
          </div>
          <RxCross1
            size={24}
            className="cursor-pointer hover:rotate-90 transition-transform duration-200"
            onClick={() => setOpenCart(false)}
          />
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {cart && cart.length > 0 ? (
            cart.map((item, index) => (
              <CartSingle
                key={index}
                data={item}
                quantityChangeHandler={quantityChangeHandler}
                removeFromCartController={removeFromCartController}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <IoBagHandleOutline size={60} className="mb-3 text-gray-400" />
              <h2 className="text-lg font-medium">Your cart is empty</h2>
              <p className="text-sm">Start adding products 🛒</p>
            </div>
          )}
        </div>

        {/* Checkout */}
        {cart && cart.length > 0 && (
          <div className="p-4 border-t bg-white sticky bottom-0">
            <Link to={"/checkout"}>
              <div className="h-[50px] flex items-center justify-center w-full bg-[#e44343] rounded-md hover:bg-red-600 transition">
                <h1 className="text-white text-[18px] font-[600]">
                  Checkout • ${totalPrice}
                </h1>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartController }) => {
  const [value, setValue] = useState(data.count);
  const totalPrice = data.discountPrice * value;

  const increament = (data) => {
    if (data.stock < value) {
      toast.error("Product is out of Stock");
    } else {
      setValue(value + 1);
      const updatedCart = { ...data, count: value + 1 };
      quantityChangeHandler(updatedCart);
    }
  };

  const decrement = (data) => {
    const newValue = Math.max(1, value - 1);
    setValue(newValue);
    const updatedCart = { ...data, count: newValue };
    quantityChangeHandler(updatedCart);
  };

  return (
    <div className="flex items-center gap-4 p-4 border-b hover:bg-gray-50 transition">
      
      {/* Quantity Controls */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => increament(data)}
          className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
        >
          <HiPlus size={16} />
        </button>
        <span className="text-sm font-medium mt-1 mb-1">{data.count}</span>
        <button
          onClick={() => decrement(data)}
          className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 hover:bg-gray-400 transition"
        >
          <HiOutlineMinus size={16} />
        </button>
      </div>

      {/* Product Image */}
      <img
        src={`${data.images[0].url}`}
        className="w-[70px] h-[70px] object-cover rounded-md border"
        alt={data.name}
      />

      {/* Product Info */}
      <div className="flex-1">
        <h1 className="text-sm font-medium text-gray-800 truncate">{data.name}</h1>
        <h2 className="text-xs text-gray-500 mt-1">
          ${data.discountPrice} × {value}
        </h2>
        <h3 className="font-semibold text-[15px] text-red-500 mt-1">
          ${totalPrice}
        </h3>
      </div>

      {/* Remove Button */}
      <RxCross1
        size={18}
        onClick={() => removeFromCartController(data)}
        className="cursor-pointer text-gray-500 hover:text-red-500 transition"
      />
    </div>
  );
};

export default Cart;
