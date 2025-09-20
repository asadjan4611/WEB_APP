import React, { useState, useEffect } from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashboardHeader = () => {
  const { seller, isSeller } = useSelector((state) => state.seller);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 70);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full h-[70px] fixed top-0 left-0 z-50 flex items-center justify-between px-6 transition-all duration-300 ${
        active ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <Link to="/dashboard" className="flex items-center">
        <img
          src="https://shopo.quomodothemes.website/assets/images/logo.svg"
          alt="logo"
          className="h-[40px] w-auto"
        />
      </Link>

      {/* Navigation Icons */}
      <nav className="flex items-center gap-6">
        <Link
          to="/dashboard-coupans"
          className="hover:text-red-600 transition transform hover:scale-110"
        >
          <AiOutlineGift size={26} />
        </Link>

        <Link
          to="/dashboard-events"
          className="hover:text-red-600 transition transform hover:scale-110"
        >
          <MdOutlineLocalOffer size={26} />
        </Link>

        <Link
          to="/dashboard-products"
          className="hover:text-red-600 transition transform hover:scale-110"
        >
          <FiShoppingBag size={26} />
        </Link>

        <Link
          to="/dashboard-orders"
          className="hover:text-red-600 transition transform hover:scale-110"
        >
          <FiPackage size={26} />
        </Link>

        {/* Messages with Notification Dot */}
        <Link
          to="/dashboard-messages"
          className="relative hover:text-red-600 transition transform hover:scale-110"
        >
          <BiMessageSquareDetail size={25} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
            3
          </span>
        </Link>

        {/* Seller Avatar */}
        {isSeller && (
          <Link to={`/seller/${seller._id}`}>
            <img
              className="h-[38px] w-[38px] rounded-full object-cover ring-2 ring-red-500 cursor-pointer hover:scale-105 transition"
              src={seller?.avatar?.url}
              alt="Seller"
            />
          </Link>
        )}
      </nav>
    </header>
  );
};

export default DashboardHeader;
