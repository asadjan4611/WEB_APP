import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../../style/style";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { backned_Url } from "../../serverRoute";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../assets/redux/actions/product";
import {
  addToWishList,
  removeFromWishList,
} from "../../assets/redux/actions/wishList";
import { addToCart } from "../../assets/redux/actions/cart";

const ProductDetail = ({ data }) => {
  // console.log("object")
  // console.log(data.shopeId);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const handleSubmitMessage = () => {};
  useEffect(() => {
    dispatch(getAllProduct(data.shopeId));
  }, []);

  const addToCartHandler = (data) => {
    console.log("data that is trasfered to add to cart", data);
    dispatch(addToCart(data));
    toast.success("Product is add in Cart");
  };

  const addToWishListHandler = (data) => {
    setClick(!click);
    dispatch(addToWishList(data));
  };

  const removeFromWishListHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishList(data));
  };

  const DecrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const Increament = () => {
    setCount(count + 1);
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.noramlFlex} w-[90%]  mt-5 flex flex-col`}>
          <div className="w-full flex py-5">
            {/* LEFT SIDE */}
            <div className="w-full 800px:w-[50%]">
              {/* Main Image */}
              <img
                src={`${backned_Url}/uploads/${data.images[select]}`}
                alt=""
                className="w-full h-[400px] object-contain rounded shadow-md"
              />

              {/* Thumbnails */}
              <div className="w-full px-5 flex flex-wrap mt-4 gap-4">
                {data.images.map((img, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer p-1 ${
                      select === index ? "border-2 border-blue-500 rounded" : ""
                    }`}
                  >
                    {/* console.log(img) */}
                    <img
                      className="h-[100px] w-[100px] object-cover rounded"
                      onClick={() => setSelect(index)}
                      src={`${backned_Url}/uploads/${data.images[index]}`}
                      // src={img.url}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full 800px:w-[50%] px-5 mt-6 800px:mt-0">
              <h1
                className={`${styles.productTitle} text-2xl font-semibold mb-4`}
              >
                {data.name}
              </h1>

              <p className="text-gray-600 mb-4">{data.description}</p>

              <div className="flex pt-3">
                <h2 className={`${styles.productDiscountPrice}`}>
                  ${data.discountPrice}
                </h2>

                <h3 className={`${styles.price}`}>
                  {data.originalPrice ? data.originalPrice + "$" : ""}
                </h3>
              </div>

              <div
                className={`${styles.noramlFlex}  mt-2 justify-between pr-5`}
              >
                <div className="flex justify-between pr-3 mt-12 items-center">
                  <div className="">
                    <button
                      onClick={DecrementCount}
                      className="bg-gradient-to-r ease-in-out duration-300 transition hover:opacity-75 shadow-lg px-4 py-2 rounded-l font-bold text-white to-teal-500 from-teal-400 "
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[10px]">
                      {count}
                    </span>
                    <button
                      onClick={Increament}
                      className="bg-gradient-to-r ease-in-out duration-300 transition hover:opacity-75 shadow-lg px-4 py-2 rounded-l font-bold text-white to-teal-500 from-teal-400 "
                    >
                      +
                    </button>
                  </div>

                  <div>
                    {click ? (
                      <AiFillHeart
                        color={click ? "red" : "#333"}
                        size={25}
                        className="mt-3 ml-2 cursor-pointer"
                        onClick={() => removeFromWishListHandler(data)}
                      />
                    ) : (
                      <AiOutlineHeart
                        color={click ? "red" : "#333"}
                        size={25}
                        className="mt-3 ml-3 cursor-pointer"
                        onClick={() => addToWishListHandler(data)}
                        title="Add to wishList"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div onClick={() => addToCartHandler({ ...data, count })}>
                <button className={`${styles.button} gap-2 text-white`}>
                  Add to Cart
                  <AiOutlineShoppingCart size={25} />
                </button>
              </div>

              <div className="flex mt-8 justify-items-start items-start">
                <Link to={`/shop/preview/${data.shopeId}`}>
                  <div className="flex">
                    <img
                      src={`${backned_Url}/uploads/${data.shop.avatar.url}`}
                      className="w-[50px] h-[50px] object-cover mt-4 rounded-full mr-2]"
                      alt="asad jan"
                    />

                    <div>
                      <h3 className={`${styles.shop_name} top-0 bottom-0 ml-3`}>
                        {data.shop.name}
                      </h3>

                      <h4
                        className={`${styles.shop_name} ml-3 top-0 bottom-0 `}
                      >
                        {data.shop.ratings} Rating
                      </h4>
                    </div>
                  </div>
                </Link>
                <div
                  onClick={handleSubmitMessage}
                  className={`${styles.button} bg-[#6443d1] ml-5 rounded h-11`}
                >
                  <span className="text-white flex  items-center">
                    Send Message
                    <AiOutlineMessage size={22} className="ml-2" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <ProductDetailsInfo data={data} products={products} />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data, products }) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#c4c7d2] w-full justify-between left-5 800px:px-10 py-2  rounded">
      <div className="w-full flex justify-between  border-b pt-10 pb-2">
        <div className="relative">
          <h5
            onClick={() => setActive(1)}
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
          >
            Product Detail
          </h5>

          {active === 1 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>

        <div className="relative">
          <h5
            onClick={() => setActive(2)}
            className="text-[#000] text-[18px] px-3 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
          >
            Product Review
          </h5>

          {active === 2 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>

        <div className="relative">
          <h5
            onClick={() => setActive(3)}
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
          >
            Seller Information
          </h5>

          {active === 3 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
      </div>

      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full justify-center min-h-[40vh] flex items-center">
          <p>No Reviews yet</p>
        </div>
      ) : null}

      {active === 3 ? (
        <div className="w-full flex flex-row 800px:flex-row justify-between p-5">
          {/* Left Side */}
          <div className="w-full 800px:w-[50%] mb-4 800px:mb-0">
            <Link to={`/shop/preview/${data.shopeId}`}>
              <div className="flex items-center">
                <img
                  src={`${backned_Url}/uploads/${data.shop.avatar.url}`}
                  className="h-[50px] w-[50px] rounded-full object-cover"
                  alt="Shop"
                />
                <div className="ml-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h4 className={`${styles.shop_name}`}>
                    {data.shop.ratings} Rating
                  </h4>
                </div>
              </div>
            </Link>
            <p className="pt-2">{data.shop.desciption}</p>
          </div>

          {/* Right Side */}
          <div className="w-full 800px:w-[45%] px-6 p-4 rounded 800px:px-0">
            <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex items-end flex-col">
              <div className="text-right">
                <h5 className="font-[600]">
                  Joined on:
                  <span className="font-[500]">
                    {data.createdAt.slice(0, 10)}
                  </span>
                </h5>
              </div>

              <div className="text-right">
                <h5 className="font-[600]">
                  Total Products:
                  <span className="font-[500]">
                    {" "}
                    {products && products.length}
                  </span>
                </h5>
              </div>
              <div className="text-right">
                <h5 className="font-[600]">
                  Toatal Reviews :<span className="font-[500]">2023</span>
                </h5>
              </div>

              <Link to={"/"}>
                <div
                  className={`${styles.button} mt-12 ml-80 rounded-md cursor-pointer`}
                >
                  <h3 className="text-white">Visit Shop</h3>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default ProductDetail;
