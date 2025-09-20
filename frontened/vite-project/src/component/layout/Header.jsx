import React, { useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineProfile,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiShoppingBag } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DropDown from "./DropDown";
import NavBar from "./NavBar";
import styles from "../../style/style";
import { backned_Url } from "../../serverRoute.js";
import Cart from "../Cart/Cart";
import WishList from "../WishList/WishList";

const Header = ({ activeHeading }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { allproducts } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);
  const { wishList } = useSelector((state) => state.wishList);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filterData =
      allproducts &&
      allproducts.filter(
        (product) =>
          product.name &&
          product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filterData);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      {/* --- Top Header --- */}
      <div className={`${styles.section}`}>
        <div className="h-[70px] my-[15px] flex justify-between items-center">
          {/* Logo */}
          <Link to={"/"}>
            <img
              className="h-[38px] rounded-lg hover:scale-110 transition-transform duration-200"
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt="Logo"
            />
          </Link>

          {/* Search Bar */}
          <div className="w-[55%] relative">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full h-[45px] px-5 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
            />
            <AiOutlineSearch
              size={22}
              className="absolute right-3 top-2.5 text-gray-500 cursor-pointer hover:text-indigo-600 transition"
            />

            {/* Search Results */}
            {searchData && searchData.length !== 0 && (
              <div className="absolute top-[50px] left-0 w-full max-h-[55vh] overflow-y-auto bg-white rounded-lg shadow-xl z-[9] p-3">
                {searchData.map((i, index) => (
                  <Link to={`/product/${i._id}`} key={index}>
                    <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md transition">
                      <img
                        src={`${i.images[0].url}`}
                        alt=""
                        className="h-[42px] w-[42px] object-cover rounded"
                      />
                      <h1 className="text-sm font-medium text-gray-700">
                        {i.name}
                      </h1>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Seller / Dashboard */}
          <div className="ml-3">
            <Link
              to={`${isSeller ? "/dashboard" : "/shop-create"}`}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow-md transition"
            >
              {isSeller ? (
                <>
                  <MdDashboard size={20} /> <span>Dashboard</span>
                </>
              ) : (
                <>
                  <FiShoppingBag size={20} /> <span>Become Seller</span>
                </>
              )}
              <IoIosArrowForward size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* --- Bottom Header --- */}
      <div
        className={`${
          active ? "shadow-md fixed top-0 left-0 z-20" : ""
        } transition items-center justify-between h-[70px] w-full bg-[#689f38]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* Categories */}
          <div>
            <div
              onClick={() => setDropDown(!dropDown)}
              className="relative w-[230px] mt-[10px] h-[60px] hidden md:block"
            >
              <BiMenuAltLeft className="absolute top-3 left-2" size={28} />
              <button className="bg-white w-full h-full text-lg font-medium flex pl-10 justify-between rounded-t-md font-sans items-center">
                Categories
              </button>
              <IoIosArrowDown
                className="absolute right-2 top-4 cursor-pointer"
                size={18}
              />
              {dropDown && (
                <DropDown allproducts={allproducts} setDropDown={setDropDown} />
              )}
            </div>
          </div>

          {/* Nav Items */}
          <div className={`${styles.noramlFlex}`}>
            <NavBar active={activeHeading} />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5">
            {/* Wishlist */}
            <div
              onClick={() => setOpenWishList(true)}
              className="relative cursor-pointer"
            >
              <AiOutlineHeart
                size={28}
                className="text-white hover:scale-110 transition"
              />
              {wishList?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishList.length}
                </span>
              )}
            </div>

            {/* Cart */}
            <div
              onClick={() => setOpenCart(true)}
              className="relative cursor-pointer"
            >
              <AiOutlineShoppingCart
                size={28}
                className="text-white hover:scale-110 transition"
              />
              {cart?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </div>

            {/* Profile */}
            <div className="relative cursor-pointer">
              {isAuthenticated ? (
                <Link to={"/profile"}>
                  <img
                    className="h-[38px] w-[38px] object-cover rounded-full border-2 border-white hover:scale-105 transition"
                    src={`${user?.avatar.url}`}
                    alt=""
                  />
                </Link>
              ) : (
                <Link to={"/login"}>
                  <CgProfile
                    size={30}
                    className="text-white hover:text-gray-200"
                  />
                </Link>
              )}
            </div>
          </div>

          {/* Cart + Wishlist Modals */}
          {openCart && <Cart setOpenCart={setOpenCart} />}
          {openWishList && <WishList setOpenWishList={setOpenWishList} />}
        </div>
      </div>
    </>
  );
};

export default Header;
