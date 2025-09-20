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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../assets/redux/actions/cart";
import {
  addToWishList,
  removeFromWishList,
} from "../../../assets/redux/actions/wishList";
import axios from "axios";

const ProductCardDetails = ({ setOpen, data }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { wishList } = useSelector((state) => state.wishList);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    if (wishList && wishList.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishList, data._id]);

  const handleSubmitMessage = async () => {
    if (isAuthenticated) {
      const userId = user._id;
      const sellerId = data?.shop._id;

      const existingConversation = conversations.find(
        (c) => c.members.includes(userId) && c.members.includes(sellerId)
      );

      if (existingConversation) {
        navigate(`/user-inbox?${existingConversation._id}`);
      } else {
        const groupTitle = data._id + user._id;
        try {
          const res = await axios.post(
            `${backned_Url}/api/conversation/create-new-conversation`,
            { groupTitle, userId, sellerId },
            { headers: { "Content-Type": "application/json" } }
          );
          navigate(`/user-inbox?${res.data.conversation._id}`);
        } catch (err) {
          toast.error(err.response?.data.message);
        }
      }
    } else {
      toast.error("Please login first to create a conversation");
    }
  };

  const DecrementCount = () => {
    if (count > 1) setCount(count - 1);
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
    products && products.reduce((acc, product) => acc + product.reviews.length, 0);
  const totalRating =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );
  const averageRating = totalRating / totalReviewLength || 0;

  return (
    <div className="bg-white">
      {data ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          {/* Modal container */}
          <div className="w-[95%] md:w-[70%] lg:w-[60%] bg-white rounded-xl shadow-xl relative overflow-hidden">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3  cursor-pointer right-3 bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition"
            >
              <RxCross1 size={22} />
            </button>

            <div className="flex flex-col md:flex-row gap-6 p-6 max-h-[85vh] overflow-y-auto">
              {/* Left section */}
              <div className="w-full md:w-1/2 flex flex-col items-center">
                <img
                  src={`${data.images[0].url}`}
                  className="rounded-lg object-cover max-h-[400px] w-full"
                  alt={data.name}
                />

                {/* Shop details */}
                <Link to={`/shop/preview/${data.shopeId}`} className="flex items-center gap-3 mt-4">
                  <img
                    src={`${data.shop.avatar.url}`}
                    className="w-[55px] h-[55px] rounded-full object-cover border border-gray-300"
                    alt={data.shop.name}
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{data.shop.name}</h3>
                    <p className="text-sm text-gray-500">
                      ({averageRating.toFixed(1)}/{totalReviewLength}) Rating
                    </p>
                  </div>
                </Link>

                {/* Message seller button */}
                <button
                  onClick={handleSubmitMessage}
                  className="mt-5 w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-lg hover:opacity-90 transition flex items-center justify-center"
                >
                  Send Message <AiOutlineMessage size={22} className="ml-2" />
                </button>

                <p className="text-sm text-red-600 font-medium mt-4">{data.sold_out} Sold</p>
              </div>

              {/* Right section */}
              <div className="w-full md:w-1/2 flex flex-col justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-3">{data.name}</h1>
                  <p className="text-gray-600 mb-4">{data.description}</p>

                  {/* Price */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-indigo-600">
                      {data.discountPrice}$
                    </span>
                    {data.originalPrice && (
                      <span className="line-through text-gray-500">
                        {data.originalPrice}$
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity & wishlist */}
                <div className="flex items-center justify-between mt-6">
                  {/* Quantity control */}
                  <div className="flex items-center">
                    <button
                      onClick={DecrementCount}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-l text-lg font-bold"
                    >
                      -
                    </button>
                    <span className="px-5 py-2 bg-gray-100">{count}</span>
                    <button
                      onClick={increamentCount}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-r text-lg font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Wishlist */}
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={28}
                        color="red"
                        className="cursor-pointer hover:scale-110 transition"
                        onClick={() => removeFromWishListHandler(data)}
                      />
                    ) : (
                      <AiOutlineHeart
                        size={28}
                        className="cursor-pointer hover:scale-110 transition"
                        onClick={() => addToWishListHandler(data)}
                      />
                    )}
                  </div>
                </div>

                {/* Add to cart */}
                <button
                  onClick={() => addToCartHandler(data._id)}
                  className="mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg hover:opacity-90 transition flex items-center justify-center"
                >
                  Add to Cart <AiOutlineShoppingCart size={22} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductCardDetails;
