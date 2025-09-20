import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../style/style";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { backned_Url } from "../../serverRoute";
import Loader from "../layout/loader";

// icons
import { MdLocationOn, MdPhone, MdDateRange } from "react-icons/md";
import { FaBoxOpen, FaStar } from "react-icons/fa";

const ShopInfo = ({ isOwner }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { products } = useSelector((state) => state.products);

  // Calculate rating
  const totalReviewLength =
    products && products.reduce((acc, product) => acc + product.reviews.length, 0);
  const totalRating =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );
  const averageRating = totalRating / totalReviewLength || 0;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${backned_Url}/api/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.sellerInfo);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message || "Something went wrong");
      });
  }, [id]);

  const logoutHandler = async () => {
    try {
      await axios.get(`${backned_Url}/api/shop/logout-seller`, {
        withCredentials: true,
      });
      navigate("/shop-login");
      window.location.reload(false);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
      {/* Shop Avatar + Name */}
      <div className="flex flex-col items-center">
        <img
          src={data?.avatar?.url}
          className="w-[140px] h-[140px] object-cover rounded-full border-4 border-red-500 shadow-md"
          alt="Shop Avatar"
        />
        <h1 className="mt-4 text-2xl font-semibold text-gray-800">{data?.name}</h1>
        <p className="mt-2 text-center text-gray-600 text-sm">{data?.description}</p>
      </div>

      {/* Shop Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
          <MdLocationOn size={22} className="text-red-500" />
          <span className="text-gray-700">{data?.address}</span>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
          <MdPhone size={22} className="text-red-500" />
          <span className="text-gray-700">{data?.phoneNumber}</span>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
          <FaBoxOpen size={22} className="text-red-500" />
          <span className="text-gray-700">Products: {products?.length}</span>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
          <FaStar size={22} className="text-yellow-500" />
          <span className="text-gray-700">
            {averageRating.toFixed(1)} / 5 ({totalReviewLength} reviews)
          </span>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm sm:col-span-2">
          <MdDateRange size={22} className="text-red-500" />
          <span className="text-gray-700">
            Joined on {data?.createdAt ? data.createdAt.slice(0, 10) : ""}
          </span>
        </div>
      </div>

      {/* Owner Controls */}
      {isOwner && (
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link to="/setting" className="w-full">
            <div className="w-full bg-red-500 hover:bg-red-600 text-white text-center py-2 rounded-lg shadow-md transition">
              Edit Shop
            </div>
          </Link>
          <button
            onClick={logoutHandler}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg shadow-md transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopInfo;
