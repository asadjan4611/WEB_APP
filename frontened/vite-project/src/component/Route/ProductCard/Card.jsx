import React from "react";
import styles from "../../../style/style";
import CountDown from "../CountDown/CountDown";
import { Link } from "react-router-dom";

const Card = ({ data, active }) => {
  return (
<div
  className={`w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${
    active ? "mb-0" : "mb-12"
  } flex flex-col lg:flex-row`}
  style={{ maxWidth: "100%" }} // 🔑 Prevent overflow
>
  {/* Image Section */}
  <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50">
    <img
      src={data.images[0].url}
      alt={data.name}
      className="w-full h-[280px] lg:h-[350px] object-contain p-4 hover:scale-105 transition-transform duration-300"
    />
  </div>

  {/* Details Section */}
  <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center">
    <h2 className="text-2xl font-bold text-gray-800">{data.name}</h2>
    <p className="text-gray-600 text-[15px] mt-3 leading-relaxed line-clamp-3">
      {data.description}
    </p>

    <div className="flex justify-between items-center py-4 border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <span className="text-gray-400 text-[16px] line-through">
          ${data.originalPrice}
        </span>
        <span className="text-xl font-semibold text-green-600">
          ${data.discountPrice}
        </span>
      </div>
      <span className="text-sm font-medium text-blue-500">
        {data.sold_out} sold
      </span>
    </div>

    <div className="mt-4">
      <CountDown data={data} />
    </div>

    <div className="flex items-center gap-4 mt-6">
      <Link to={`/product/${data._id}?isEvent=true`}>
        <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium shadow-md hover:opacity-90 transition">
          See Details
        </button>
      </Link>
      <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-md hover:opacity-90 transition">
        Add to Cart
      </button>
    </div>
  </div>
</div>

  );
};

export default Card;
