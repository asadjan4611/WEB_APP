import React, { useState } from "react";
import { categoriesData, productData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../../style/style";
import { backned_Url } from "../../server.js";
import Cart from "../Cart/Cart";
import WishList from "../WishList/WishList";
const Header = ({ activeHeading }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  //  console.log("user info is",user)
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filterData = productData.filter(
      (product) =>
        product.name && product.name.toLowerCase().includes(term.toLowerCase())
    );
    // console.log("your filter data is ", filterData);
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
      <div className={`${styles.section}`}>
        {/* first header */}
        <div className="h-[60px] my-[20px] flex justify-between items-center">
          {/* Logo */}
          <div className="">
            <Link to={"/"}>
              <img
                className="h-[30px] rounded-lg"
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Search bar */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product......"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full h-[40px] px-4 border-2 rounded-md"
            />
            <AiOutlineSearch
              size={20}
              className="absolute right-2 top-2 text-gray-600 cursor-pointer"
            />

            {/* Search Results Dropdown */}
            {searchData && searchData.length !== 0 && (
              <div className="absolute top-[45px] left-0 w-full min-h-[40vh] bg-slate-50 shadow-sm z-[9] p-4">
                {searchData.map((i, index) => {
                  const product_name = i.name.replace(/\s+/g, "-");
                  return (
                    <Link to={`/products/${product_name}`} key={index}>
                      <div className="w-full flex items-center gap-4 py-2 hover:bg-gray-100 rounded">
                        <img
                          src={i.image_Url[0].url}
                          alt=""
                          className="h-[40px] w-[40px] object-cover"
                        />
                        <h1 className="text-sm">{i.name}</h1>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className={`${styles.button} rounded-md ml-2`}>
            <Link to={"/shop-create"}>
              <h1 className="items-center flex text-white">
                Become Seller <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>

      {/* seconf header */}
      <div
        className={`${
          active === true ? "shadow:sm fixed top-0 left-0 z-10" : null
        } transition items-center justify-between h-[70px] w-full bg-[#3321c8] `}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* categories */}
          <div>
            <div
              onClick={() => setDropDown(!dropDown)}
              className="relative w-[230px] mt-[10px] h-[60px] 1000px:block"
            >
              <BiMenuAltLeft className="absolute top-3 left-2" size={30} />
              <button className=" bg-white w-full h-[100%] text-lg font-[500] flex pl-10 justify-between rounded-t-md font-serif items-center">
                All Categories
              </button>
              <IoIosArrowDown
                className="absolute right-2 top-4 cursor-pointer"
                size={20}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          {/* naviItems */}
          <div className={`${styles.noramlFlex}`}>
            <NavBar active={activeHeading} />
          </div>
          <div className="flex">
            {/* favourite order products */}

            <div onClick={()=>setOpenWishList(true)} className={`${styles.noramlFlex}`}>
              <div className="relative w-fit cursor-pointer mr-[15px]">
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute m-0 p-0  top-0 right-0 bg-green-400   text-white font-mono leading-tight text-center text-[15px]  rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </div>
            </div>

            {/* shopping cart products */}
            <div onClick={()=>setOpenCart(true)} className={`${styles.noramlFlex}`}>
              <div className="relative w-fit cursor-pointer mr-[15px]">
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute m-0 p-0  top-0 right-0 bg-green-400   text-white font-mono leading-tight text-center text-[15px]  rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </div>
            </div>

            {/* profile */}

            <div className={`${styles.noramlFlex}`}>
              <div className="relative w-fit cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to={"/profile"}>
                    <img
                      className="h-[35px] w-[35]px] rounded-full"
                      src={`${backned_Url}/uploads/${user.avatar.url}`}
                      alt="asad jan"
                    />
                  </Link>
                ) : (
                  <Link to={"/login"}>
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>

            {/* cart open */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null
            }


            {/* wishList  open cart */}
            
            
            {/* cart open */}
            {
            openWishList ? <WishList setOpenWishList={setOpenWishList} /> : null
            }

          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
