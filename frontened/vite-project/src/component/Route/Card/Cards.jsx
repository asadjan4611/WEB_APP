import React from "react";
import styles from "../../../style/style";
import CountDown from "../CountDown/CountDown";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../assets/redux/actions/cart";
import { ShoppingCart, Info } from "lucide-react"; // icons

// this card for event page of home page

const Cards = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addtoCartHandler = (id) => {
    const isItemExist = cart && cart.find((i) => i._id === id);
    if (isItemExist) {
      toast.error("Item already in cart");
    } else {
      dispatch(addToCart(data));
      toast.success("Item added to cart");
    }
  };

  return (
    <div
      className={`w-full bg-white shadow-md rounded-2xl overflow-hidden transform transition duration-300 hover:shadow-xl hover:scale-[1.02] ${
        active ? "mb-0" : "mb-10"
      }`}
    >
      {/* Product image */}
      <div className="w-full h-56 md:h-64 overflow-hidden">
        <img
          src={data.images[0].url}
          alt={data.name}
          className="w-full h-full object-contain hover:scale-110 transition duration-500"
        />
      </div>

      {/* Card content */}
      <div className="p-4 flex flex-col justify-between">
        {/* Title */}
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 truncate">
          {data.name}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {data.description}
        </p>

        {/* Price + sold */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <span className="text-red-500 text-sm line-through">
              ${data.originalPrice}
            </span>
            <span className="text-green-600 font-bold text-lg">
              ${data.discountPrice}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-500">
            {data.sold_out} sold
          </span>
        </div>

        {/* Countdown Timer */}
        <div className="mt-3">
          <CountDown data={data} />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-4">
          <Link
            to={`/product/${data._id}?isEvent=true`}
            className="flex items-center justify-center gap-2 w-1/2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition"
          >
            <Info size={18} /> Details
          </Link>
          <button
            onClick={() => addtoCartHandler(data._id)}
            className="flex items-center justify-center gap-2 w-1/2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition"
          >
            <ShoppingCart size={18} /> Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
