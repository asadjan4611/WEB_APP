import React from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { VscNewFile } from "react-icons/vsc";
import { MdOutlineLocalOffer } from "react-icons/md";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const DashboarSideBar = ({ active }) => {
  const menuItems = [
    { id: 1, label: "Dashboard", icon: <RxDashboard size={22} />, link: "/dashboard" },
    { id: 2, label: "All Orders", icon: <FiShoppingBag size={22} />, link: "/dashboard-orders" },
    { id: 3, label: "All Products", icon: <RxDashboard size={22} />, link: "/dashboard-products" },
    { id: 4, label: "Create Product", icon: <AiOutlineFolderAdd size={22} />, link: "/dashboard-create-product" },
    { id: 5, label: "All Events", icon: <MdOutlineLocalOffer size={22} />, link: "/dashboard-events" },
    { id: 6, label: "Create Event", icon: <VscNewFile size={22} />, link: "/dashboard-create-event" },
    { id: 7, label: "Withdraw Money", icon: <CiMoneyBill size={22} />, link: "/dashboard-withdraw-money" },
    { id: 8, label: "Shop Inbox", icon: <BiMessageSquareDetail size={22} />, link: "/dashboard-messages" },
    { id: 9, label: "Discount Codes", icon: <AiOutlineGift size={22} />, link: "/dashboard-coupans" },
    { id: 10, label: "Refunds", icon: <HiOutlineReceiptRefund size={22} />, link: "/dashboard-refunds" },
    { id: 11, label: "Setting", icon: <CiSettings size={22} />, link: "/setting" },
  ];

  return (
    <div className="w-full h-[89vh] py-4 shadow-sm overflow-y-scroll sticky top-15 left-0 z-10 
                    scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {menuItems.map((item) => (
        <Link
          key={item.id}
          to={item.link}
          className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200 group
          ${active === item.id ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md" : "hover:bg-gray-100 text-gray-700"}`}
        >
          <div
            className={`mr-3 transition-transform duration-200 group-hover:scale-110 
            ${active === item.id ? "text-white" : "text-gray-600"}`}
          >
            {item.icon}
          </div>
          <span className={`hidden md:block font-medium text-[16px] 
            ${active === item.id ? "text-white" : "text-gray-700"}`}>
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default DashboarSideBar;
