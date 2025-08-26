import React from "react";
import { Link } from "react-router-dom";
// import { styles } from "../../../style/style";
import { RxDashboard } from "react-icons/rx";
import styles from "../../../style/style";
import { AiOutlineFolderAdd, AiOutlineGift, AiOutlineSetting } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { VscNewFile } from "react-icons/vsc";
import { MdOutlineLocalOffer } from "react-icons/md";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { CircularProgress } from "@mui/material";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
const DashboarSideBar = ({ active }) => {
  return (
    <div className="w-full h-[89vh] py-3 shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      <div className="w-full flex items-center">
        <Link to={"/dashboard"} className="w-full flex items-center"> 
          <RxDashboard
          className="my-3"
            size={25}
            color={`${active === 1 ? "crimson" : "#555"}`}
          />
          <h1
            className={`hidden md:block my-2 pl-2 text-[20px] font-[800px] ${
              active === 1 ? "text-[crimson]" : "text-[#555"
            }`}
          >
            DashBoard
          </h1>
        </Link>
      </div>

       <div className="w-full flex items-center">
        <Link to={"/dashboard-orders"} className="w-full flex items-center"> 
          <FiShoppingBag
          className="my-3"
            size={30}
            color={`${active === 2 ? "crimson" : "#555"}`}
          />
          <h1
            className={`hidden md:block my-2 pl-2 text-[20px] font-[400px] ${
              active === 2 ? "text-[crimson]" : "text-[#555"
            }`}
          >
          All Orders
          </h1>
        </Link>
      </div>


       <div className="w-full flex items-center">
        <Link to={"/dashboard-products"} className="w-full flex items-center"> 
          <RxDashboard
          className="my-3"
            size={30}
            color={`${active === 3 ? "crimson" : "#555"}`}
          />
          <h1
            className={`hidden md:block my-2 pl-2 text-[20px] font-[400px] ${
              active === 3 ? "text-[crimson]" : "text-[#555"
            }`}
          >
           All Products
          </h1>
        </Link>
      </div>


       <div className="w-full flex items-center">
        <Link to={"/dashboard-create-product"} className="w-full flex items-center"> 
          <AiOutlineFolderAdd
          className="my-3"
            size={30}
            color={`${active === 4 ? "crimson" : "#555"}`}
          />
          <h1
            className={`hidden md:block my-2 pl-2 text-[20px] font-[400px] ${
              active === 4 ? "text-[crimson]" : "text-[#555"
            }`}
          >
            Create Product
          </h1>
        </Link>
      </div>


       <div className="w-full flex items-center">
        <Link to={"/dashboard-events"} className="w-full flex items-center"> 
          <MdOutlineLocalOffer
          className="my-3"
            size={30}
            color={`${active === 5 ? "crimson" : "#555"}`}
          />
          <h1
            className={`hidden md:block my-2 pl-2 text-[20px] font-[400px] ${
              active === 5 ? "text-[crimson]" : "text-[#555"
            }`}
          >
            All Events
          </h1>
        </Link>
      </div>

       <div className="w-full flex items-center">
        <Link to={"/dashboard-create-event"} className="w-full flex items-center"> 
          <VscNewFile
          className="my-3"
            size={30}
            color={`${active === 6 ? "crimson" : "#555"}`}
          />
          <h1
            className={`hidden md:block my-2 pl-2 text-[20px] font-[400px] ${
              active === 6 ? "text-[crimson]" : "text-[#555"
            }`}
          >
            Create Event
          </h1>
        </Link>
      </div>

       <div className="w-full flex items-center">
        <Link to={"/dashboard-withdraw-money"} className="w-full flex items-center"> 
          <CiMoneyBill
          className="my-3"
            size={30}
            color={`${active === 7 ? "crimson" : "#555"}`}
          />
          <h1
            className={`hidden md:block my-2 pl-2 text-[20px] font-[400px] ${
              active === 7 ? "text-[crimson]" : "text-[#555"
            }`}
          >
            Withdraw Money
          </h1>
        </Link>
      </div>


       <div className="w-full flex items-center">
        <Link to={"/dashboard-messages"} className="w-full flex items-center"> 
          <BiMessageSquareDetail
          className="my-3"
            size={30}
            color={`${active === 8 ? "crimson" : "#555"}`}
          />
          <h1
            className={`hidden md:block my-2 pl-2 text-[20px] font-[400px] ${
              active === 8 ? "text-[crimson]" : "text-[#555"
            }`}
          >
            Shop Inbox
          </h1>
        </Link>
      </div>


       <div className="w-full flex items-center">
        <Link to={"/dashboard-coupans"} className="w-full flex items-center"> 
          <AiOutlineGift
          className="my-3"
            size={30}
            color={`${active === 9 ? "crimson" : "#555"}`}
          />
          <h1
            className={`hidden md:block my-2 pl-2 text-[20px] font-[400px] ${
              active === 9 ? "text-[crimson]" : "text-[#555"
            }`}
          >
            Discount Codes
          </h1>
        </Link>
      </div>


       <div className="w-full flex items-center">
        <Link to={"/dashboard-refunds"} className="w-full flex items-center"> 
          <HiOutlineReceiptRefund
          className="my-3"
            size={30}
            color={`${active === 10 ? "crimson" : "#555"}`}
          />
          <h1
            className={`hidden md:block my-2 pl-2 text-[20px] font-[400px] ${
              active === 10 ? "text-[crimson]" : "text-[#555"
            }`}
          >
            Refunds
          </h1>
        </Link>
      </div>

       <div className="w-full flex items-center">
        <Link to={"/dashboard-setting"} className="w-full flex items-center"> 
          <CiSettings
          className="my-3"
            size={30}
            color={`${active === 11 ? "crimson" : "#555"}`}
          />
          <h1
            className={`hidden md:block my-2 pl-2 text-[20px] font-[400px] ${
              active === 11 ? "text-[crimson]" : "text-[#555"
            }`}
          >
            Setting
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default DashboarSideBar;
