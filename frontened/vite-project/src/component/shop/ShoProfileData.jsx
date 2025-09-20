import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../assets/redux/actions/product.js";
import { getAllEvennts } from "../../assets/redux/actions/event.js";
import ProductCard from "../Route/ProductCard/ProductCard.jsx";
import Card from "../Route/ProductCard/Card.jsx";
import Rating from "../product/Rating.jsx";
import styles from "../../style/style";
import { FaBoxOpen, FaGift, FaStar, FaChartLine } from "react-icons/fa";

const ShopProfileData = ({ isOwner }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.events);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllProduct(id));
    dispatch(getAllEvennts(id));
  }, [dispatch, id]);

  const [active, setActive] = useState(1);

  // Flatten all product reviews into a single array
  const allReviews = products?.flatMap((product) => product.reviews) || [];

  const tabs = [
    { id: 1, label: "Shop Products", icon: <FaBoxOpen /> },
    { id: 2, label: "Running Events", icon: <FaGift /> },
    { id: 3, label: "Shop Reviews", icon: <FaStar /> },
  ];

  return (
    <div className="w-full">
      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center mt-5 justify-between bg-white shadow-sm rounded-lg p-4">
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-md transition-all duration-300 ${
                active === tab.id
                  ? "bg-red-500 text-white shadow-md"
                  : "text-gray-600 hover:text-red-500 hover:bg-gray-100"
              }`}
            >
              {tab.icon}
              <span className="font-semibold">{tab.label}</span>
            </div>
          ))}
        </div>

        {isOwner && (
          <Link to="/dashboard">
            <div
              className={`${styles.button} flex items-center gap-2 !w-[180px] !h-[42px] !rounded-[8px]`}
            >
              <FaChartLine />
              <span className="text-white">Go To Dashboard</span>
            </div>
          </Link>
        )}
      </div>

      {/* Content */}
      <div className="mt-6">
        {/* Shop Products */}
        {active === 1 && (
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
            {products.length > 0 ? (
              products.map((product, index) => (
                <ProductCard key={index} isShop={true} data={product} />
              ))
            ) : (
              <h5 className="w-full text-center py-5 text-lg text-gray-500">
                No products available for this shop.
              </h5>
            )}
          </div>
        )}

        {/* Running Events */}
        {active === 2 && (
          <div className="flex">
            {events.length > 0 ? (
              events.map((event, index) => (
                <Card key={index} isShop={true} data={event} />
              ))
            ) : (
              <h5 className="w-full text-center py-5 text-lg text-gray-500">
                No running events for this shop.
              </h5>
            )}
          </div>
        )}

        {/* Shop Reviews */}
        {active === 3 && (
          <div className="space-y-6">
            {allReviews.length > 0 ? (
              allReviews.map((review, index) => (
                <div
                  key={index}
                  className="flex items-start bg-white shadow-md rounded-lg p-4"
                >
                  <img
                    src={review?.user?.avatar?.url}
                    alt={review?.user?.name}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h1 className="font-semibold">{review.user.name}</h1>
                      <Rating ratings={review?.rating} />
                    </div>
                    <p className="text-gray-600 mt-1">{review?.comment}</p>
                    <p className="text-gray-400 text-sm mt-1">2 days ago</p>
                  </div>
                </div>
              ))
            ) : (
              <h5 className="w-full text-center py-5 text-lg text-gray-500">
                No reviews for this shop yet.
              </h5>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopProfileData;
