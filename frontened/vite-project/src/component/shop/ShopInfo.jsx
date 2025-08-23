import React from "react";
import { useSelector } from "react-redux";
import { server } from "../../folder/server";
import styles from "../../style/style";
import { toast } from "react-toastify";
import axios from "axios";
import { Navigate } from "react-router-dom";

const ShopInfo = ({isOwner}) => {

 const logoutHander =async() =>{
    try {
      const res= await axios.get(`http://localhost:8000/api/shop/logout-seller`);
      if (res.data === "success") {
        <Navigate to={"/login-shop"}/>
      }
    } catch (error) {
      toast.error(error)
    }
 }

  const { seller } = useSelector((state) => state.seller);
  console.log(seller.avatar.url);
  return (
    <div>
      <div className="w-full py-5">
        <div className="w-full flex items-center justify-center">
          <img
            src={`http://localhost:8000/uploads/${seller.avatar.url}`}
            className="w-[150px] h-[150px] object-fit rounded-full"
            alt="asadjan"
          />
        </div>
        <h1 className="text-center py-2 text-[20px]">{seller.name}</h1>

        <p className="text-[16px]  text-[#000000a6] flex items-center">
          {seller.description}
        </p>
      </div>
      <div className="p-3">
        <h2 className="font-[500px] "> Address</h2>
        <h3 className="text-[#000000a6]">{seller.address}</h3>
      </div>
      <div className="p-3">
        <h2 className="font-[500px] "> Phone Number</h2>
        <h3 className="text-[#000000a6]">{seller.phoneNumber}</h3>
      </div>
      <div className="p-3">
        <h2 className="font-[500px] "> Total Products</h2>
        <h3 className="text-[#000000a6]">10</h3>
      </div>
      <div className="p-3">
        <h2 className="font-[500px] ">Shop Rating</h2>
        <h3 className="text-[#000000a6]">4/5</h3>
      </div>
      <div className="p-3">
        <h2 className="font-[500px] "> Joined on</h2>
        <h3 className="text-[#000000a6]">{seller.createdAt}</h3>
      </div>

      {
        isOwner && (
            <div className="py-3 px-4">
            <div className={`${styles.button} !h-[42px] !w-full !rounded-[5px]`}>
              <span className="text-white">Edit Shop</span>
            </div>
             <div onClick={logoutHander} className={`${styles.button} cursor-pointer !h-[42px] !w-full !rounded-[5px]`}>
              <span className="text-white">Logout shop</span>
            </div>
            </div>
        )
      }
    </div>
  );
};

export default ShopInfo;
