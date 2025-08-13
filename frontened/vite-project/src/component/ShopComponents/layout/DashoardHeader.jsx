import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { useSelector } from "react-redux";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { backned_Url } from "../../../server";
const DashoardHeader = () => {
  const { seller,isSeller } = useSelector((state) => state.seller);
  console.log(seller);
  return (
    <div className="w-full h-[80px] shadow sticky top-0 left-0 flex items-center justify-between px-4">
      <div>
        <Link to={"/dashboard"}>
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt=""
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div
          className="flex
             items-center mr-4"
        >
          <Link className="md:block hidden" to={"/dashboard/coupans"}>
            <AiOutlineGift
              color="#555"
              className="mx-5 cursor-pointer"
              size={30}
            />
          </Link>

          <Link className="md:block hidden" to={"/dashboard-events"}>
            <MdOutlineLocalOffer
              color="#555"
              className="mx-5 cursor-pointer"
              size={30}
            />
          </Link>
          <Link className="md:block hidden" to={"/dashboard-products"}>
            <FiShoppingBag
              color="#555"
              className="mx-5 cursor-pointer"
              size={30}
            />
          </Link>

          <Link className="md:block hidden" to={"/dashboard-orders"}>
            <FiPackage color="#555" className="mx-5 cursor-pointer" size={30} />
          </Link>

          <Link to={"/dashboard-message"}>
            <BiMessageSquareDetail
              color="#555"
              className="mx-5 cursor-pointer"
              size={25}
            />
          </Link>



         {
          isSeller && (
                    <Link to={`/seller/${seller._id}`}>
            <img
              className="h-[35px] w-[35px] rounded-full"
              src={`${backned_Url}/uploads/${seller.avatar.url}`}
              alt="asad jan"
            />
          </Link>
          )
         }
        
        </div>
      </div>
    </div>
  );
};

export default DashoardHeader;
