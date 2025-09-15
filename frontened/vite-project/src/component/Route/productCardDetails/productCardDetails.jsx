import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../style/style";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { backned_Url } from "../../../serverRoute";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../assets/redux/actions/cart";
import {
  addToWishList,
  removeFromWishList,
} from "../../../assets/redux/actions/wishList";
const ProductCardDetails = ({ setOpen, data }) => {
  // console.log(data);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { wishList } = useSelector((state) => state.wishList);
  const { products } = useSelector((state) => state.products);
  const [select, setSelect] = useState(false);

  useEffect(() => {
    if (wishList && wishList.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishList]);

  const handleSubmittMessage = () => {};
  const DecrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increamentCount = () => {
    setCount(count + 1);
  };

  const addToCartHandler = (id) => {
    const isItemExist = cart && cart.find((i) => i._id === id);
    if (isItemExist) {
      toast.error("Item is already exist in Cart!");
    } else {
      if (count > data.stock) {
        toast.error("Product Limit is outreached!!!");
      } else {
        const cartData = { ...data, count: count };
        dispatch(addToCart(cartData));
        // console.log("cart Data is ",cartData)
        toast.success("Item is added in Cart .. ");
      }
    }
  };

  const addToWishListHandler = (data) => {
    setClick(!click);
    dispatch(addToWishList(data));
  };

  const removeFromWishListHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishList(data));
  };

  const totalReviewLength =
    products &&
    products.reduce(
      (acc, product) =>
         acc + product.reviews.length, 0);
  const totalRating =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce(
          (sum, review) => sum + review.rating, 0),
      0
    );
  const averageRating = totalRating/totalReviewLength || 0;

  return (
    <div className="bg-white">
      {data ? (
        <div className="flex inset-0 justify-center z-40 bg-[#00000030] items-center fixed">
          <div className=" w-[90%] 800px:w-[60%] 800px:h-[75vh] bg-white relative shadow-sm p-4  h-[90vh] overflow-y-scroll">
            <RxCross1
              size={30}
              className="absolute top-3 right-3 z-50"
              onClick={() => setOpen(false)}
            />

            <div className="w-full flex ">
              {/* Left side  */}
              <div className=" block w-[50%] 800px:w-[50%]">
                <img
                  src={`${backned_Url}/uploads/${data.images[0]}`}
                  className="object-contain h-[70vh] px-2"
                  alt=""
                />
                <Link to={`/shop/preview/${data.shopeId}`}>
                  <div className="flex">
                    <img
                      src={`${backned_Url}/uploads/${data.shop.avatar.url}`}
                      className="w-[50px] h-[50px] object-cover mt-4 rounded-full mr-2]"
                      alt=""
                    />

                    <div>
                      <h3 className={`${styles.shop_name} top-0 bottom-0 ml-3`}>
                        {data.shop.name}
                      </h3>

                      <h3
                        className={`${styles.shop_name} ml-3 top-0 bottom-0 `}
                      >
                        ({averageRating}/{totalReviewLength}) Rating
                      </h3>
                    </div>
                  </div>
                </Link>
                <div
                  onClick={handleSubmittMessage}
                  className={`${styles.button} mt-4 rounded-[4px] h-11 bg-[#000]`}
                >
                  <span className="text-white flex items-center">
                    Send Message <AiOutlineMessage size={28} className="ml-1" />
                  </span>
                </div>
                <h4 className="text-[15px] text-red-500 font-semibold ml-3 mt-5">
                  {data.sold_out} Sold out
                </h4>
              </div>

              {/* right side  */}
              <div className="flex flex-col w-[50%]">
                <div className="w-full 600px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                  <h1 className={`${styles.productTitle} text-[20px]`}>
                    {data.name}
                  </h1>
                  <p className="mt-3">{data.description}</p>
                </div>

                <div className=" flex pt-3">
                  <h6 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice} $
                  </h6>
                  <h4 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + "$" : null}
                  </h4>
                </div>
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
                      onClick={increamentCount}
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
                <div
                  onClick={() => addToCartHandler(data._id)}
                  className={`${styles.button} mt-4 rounded-[4px] h-11 bg-[#000]`}
                >
                  <span className="text-white flex items-center">
                    Add to Cart
                    <AiOutlineShoppingCart size={28} className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductCardDetails;
