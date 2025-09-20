import React from "react";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  AiOutlineCreditCard,
  AiOutlineLogout,
  AiOutlineMessage,
} from "react-icons/ai";
import { backned_Url } from "../../serverRoute";

const menuItems = [
  { id: 1, label: "Profile", icon: <RxPerson size={22} /> },
  { id: 2, label: "Orders", icon: <HiOutlineShoppingBag size={22} /> },
  { id: 3, label: "Refund", icon: <HiOutlineReceiptRefund size={22} /> },
  { id: 4, label: "Inbox", icon: <AiOutlineMessage size={22} />, route: "/user-inbox" },
  { id: 5, label: "Track Order", icon: <MdOutlineTrackChanges size={22} /> },
  { id: 6, label: "Change Password", icon: <AiOutlineCreditCard size={22} /> },
  { id: 7, label: "Address", icon: <TbAddressBook size={22} /> },
];

const ProfileSideBar = ({ active, setActive }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios
      .get(`${backned_Url}/api/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Logout failed");
      });
  };

  return (
    <div className="w-full bg-gradient-to-b from-blue-600 to-indigo-700 rounded-xl p-5 shadow-lg text-white">
      {/* Sidebar Header */}
      <h2 className="text-lg font-semibold mb-6 text-center border-b border-white/20 pb-3">
        My Account
      </h2>

      {/* Menu Items */}
      <div className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setActive(item.id);
              if (item.route) navigate(item.route);
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
              active === item.id
                ? "bg-white text-blue-600 shadow-md font-medium"
                : "hover:bg-white/20"
            }`}
          >
            <span
              className={`${
                active === item.id ? "text-blue-600" : "text-white"
              }`}
            >
              {item.icon}
            </span>
            <span>{item.label}</span>
          </div>
        ))}

        {/* Logout */}
        <div
          onClick={logoutHandler}
          className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-red-500/80 mt-4 bg-red-600"
        >
          <AiOutlineLogout size={22} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSideBar;
