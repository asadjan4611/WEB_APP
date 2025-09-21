import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../style/style";
import ProductCardDetails from "../productCardDetails/ProductCardDetails.jsx";
import ReactDOM from "react-dom";

import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishList,
  removeFromWishList,
} from "../../../assets/redux/actions/wishList";
import { addToCart } from "../../../assets/redux/actions/cart";
import { toast } from "react-toastify";
import Rating from "../../product/Rating";

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const d = data.name;
  const { wishList } = useSelector((state) => state.wishList);
  const product_name = d.replace(/\s+/g, "-");
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishList && wishList.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishList, data._id]);

  const addToWishListHandler = (data) => {
    setClick(!click);
    dispatch(addToWishList(data));
  };

  const addToCartHandler = (data) => {
    const cartData = { ...data, count: 1 };
    dispatch(addToCart(cartData));
    toast.success("Product is added to Cart");
  };

  const removeFromWishListHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishList(data));
  };

  return (
    <>
      <div className="w-full h-[400px] bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 relative cursor-pointer p-4 flex flex-col justify-between ">
        {/* Product Image + Action Icons */}
        <div className="relative w-full h-[200px] flex justify-center items-center">
          <Link to={`/product/${data._id}`} className="w-full h-full flex justify-center">
            <img
              src={`${data.images[0].url}`}
              className="object-contain w-full h-full rounded-md group-hover:scale-105 transition-transform duration-300"
              alt="loading error"
            />
          </Link>

          {/* Action Icons */}
          <div className="absolute top-3 right-3 flex flex-col gap-3 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-md">
            {click ? (
              <AiFillHeart
                color="red"
                size={22}
                className="cursor-pointer hover:scale-110 transition"
                onClick={() => removeFromWishListHandler(data)}
                title="Remove from wishList"
              />
            ) : (
              <AiOutlineHeart
                size={22}
                className="cursor-pointer hover:scale-110 transition"
                onClick={() => addToWishListHandler(data)}
                title="Add to wishList"
              />
            )}

            <AiOutlineEye
              size={22}
              className="cursor-pointer hover:scale-110 transition"
              onClick={() => setOpen(!open)}
              title="Quick View"
            />

            <AiOutlineShoppingCart
              size={22}
              className="cursor-pointer hover:scale-110 transition"
              onClick={() => addToCartHandler(data)}
              title="Add to Cart"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-4 flex flex-col flex-1 justify-between">
          <Link to={`/shop/preview/${data.shopeId}`}>
            <h1 className={`${styles.shop_name} text-sm text-blue-600 hover:underline`}>
              {data.shop.name}
            </h1>
          </Link>

          <Link to={`/product/${data._id}`}>
            <h2 className="font-semibold text-gray-800 mt-1 text-base line-clamp-2">
              {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
            </h2>
          </Link>

          <div className="flex items-center mt-2">
            <Rating ratings={data.rating} />
          </div>

          {/* Price + Sold Out */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h5 className="text-lg font-bold text-pink-600">
                {data?.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice}
                $
              </h5>
              {data.originalPrice ? (
                <h4 className="text-sm text-gray-400 line-through">
                  {data.originalPrice}$
                </h4>
              ) : null}
            </div>
            <span className="text-sm font-medium text-gray-500">
              {data.sold_out} sold
            </span>
          </div>
        </div>
      </div>

     {open &&
  ReactDOM.createPortal(
    <ProductCardDetails setOpen={setOpen} data={data} />,
    document.body
  )}
    </>
  );
};

export default ProductCard;
