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
import Rating from "./Rating";

const ProductDetail = ({ data }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { conversation } = useSelector((state) => state.conversation);
  const { products } = useSelector((state) => state.products);

  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const [count, setCount] = useState(1);
  const [activeTab, setActiveTab] = useState(1); // 👈 merged tab state
  const navigate = useNavigate();

  // ------------------ Handle Messaging ------------------
  const handleSubmitMessage = async () => {
    if (!isAuthenticated) return toast.error("Please login first!");

    const userId = user._id;
    const sellerId = data?.shop._id;

    const existingConversation = conversation.find(
      (c) => c.members.includes(userId) && c.members.includes(sellerId)
    );

    if (existingConversation) {
      navigate(`/user-inbox?${existingConversation._id}`);
    } else {
      try {
        const groupTitle = data?.shop._id + user?._id;
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
  };

  useEffect(() => {
    if (data?.shopeId) dispatch(getAllProduct(data.shopeId));
  }, [data]);

  // ------------------ Handlers ------------------
  const addToCartHandler = () => {
    dispatch(addToCart({ ...data, count }));
    toast.success("Added to Cart");
  };

  const toggleWishList = () => {
    setClick(!click);
    click ? dispatch(removeFromWishList(data)) : dispatch(addToWishList(data));
  };

  const DecrementCount = () => count > 1 && setCount(count - 1);
  const Increament = () => setCount(count + 1);

  // ------------------ Ratings ------------------
  const totalReviewLength =
    products?.reduce((acc, product) => acc + product.reviews.length, 0) || 0;

  const totalRating =
    products?.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    ) || 0;

  const averageRating = totalRating / totalReviewLength || 0;

  return (
    <div className="bg-gray-50 py-8">
      {data ? (
        <div className="max-w-6xl mx-auto px-4">
          {/* ============== TOP SECTION ============== */}
          <div className="flex flex-col 800px:flex-row gap-10">
            {/* LEFT SIDE */}
            <div className="w-full 800px:w-[50%]">
              <img
                src={`${data.images[select].url}`}
                alt={data.name}
                className="w-full h-[450px] object-contain rounded-lg shadow-md border bg-white"
              />

              {/* Thumbnails */}
              <div className="flex gap-3 mt-5 flex-wrap">
                {data.images.map((img, index) => (
                  <img
                    key={index}
                    onClick={() => setSelect(index)}
                    src={`${img.url}`}
                    alt=""
                    className={`h-[80px] w-[80px] object-cover rounded-lg cursor-pointer border-2 transition ${
                      select === index
                        ? "border-indigo-500"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full 800px:w-[50%] space-y-6">
              <h1 className="text-3xl font-bold text-gray-800">{data.name}</h1>
              <p className="text-gray-600 leading-relaxed">{data.description}</p>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-2xl font-semibold text-indigo-600">
                  ${data.discountPrice}
                </span>
                {data.originalPrice && (
                  <span className="line-through text-gray-400 text-lg">
                    ${data.originalPrice}
                  </span>
                )}
              </div>

              {/* Quantity + Wishlist */}
              <div className="flex items-center justify-between">
                <div className="flex items-center shadow rounded-lg overflow-hidden">
                  <button
                    onClick={DecrementCount}
                    className="bg-gray-200 px-4 py-2 text-xl hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 font-semibold">{count}</span>
                  <button
                    onClick={Increament}
                    className="bg-gray-200 px-4 py-2 text-xl hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <button onClick={toggleWishList}>
                  {click ? (
                    <AiFillHeart size={28} className="text-red-500" />
                  ) : (
                    <AiOutlineHeart size={28} className="text-gray-600" />
                  )}
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={addToCartHandler}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg shadow hover:bg-indigo-700 transition"
              >
                <AiOutlineShoppingCart size={22} />
                Add to Cart
              </button>

              {/* Seller Info + Message */}
              <div className="flex items-center gap-5 mt-6">
                <Link
                  to={`/shop/preview/${data.shopeId}`}
                  className="flex items-center gap-3"
                >
                  <img
                    src={`${data.shop.avatar.url}`}
                    className="w-[55px] h-[55px] object-cover rounded-full shadow"
                    alt="Shop Avatar"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {data.shop.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {averageRating.toFixed(1)} ⭐ ({totalReviewLength} reviews)
                    </p>
                  </div>
                </Link>

                <button
                  onClick={handleSubmitMessage}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 transition text-white px-4 py-2 rounded-lg"
                >
                  <AiOutlineMessage size={20} />
                  Message Seller
                </button>
              </div>
            </div>
          </div>

          {/* ============== MERGED TABS SECTION ============== */}
          <div className="bg-white shadow-md mt-10 rounded-lg p-6">
            {/* Tabs */}
            <div className="flex gap-10 border-b pb-2">
              {["Product Detail", "Product Review", "Seller Info"].map(
                (tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index + 1)}
                    className={`pb-2 text-lg font-medium ${
                      activeTab === index + 1
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-600 hover:text-indigo-600"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>

            {/* Content */}
            <div className="mt-6">
              {activeTab === 1 && (
                <p className="text-gray-700">{data.description}</p>
              )}

              {activeTab === 2 && (
                <div className="space-y-4">
                  {data.reviews.length > 0 ? (
                    data.reviews.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg shadow-sm"
                      >
                        <img
                          className="w-[50px] h-[50px] rounded-full object-cover"
                          src={`${backned_Url}/uploads/${item.user.avatar.url}`}
                          alt={item.user.name}
                        />
                        <div>
                          <h5 className="font-semibold">{item.user.name}</h5>
                          <p className="text-gray-600">{item.comment}</p>
                          <Rating ratings={item.rating} />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No reviews yet.</p>
                  )}
                </div>
              )}

              {activeTab === 3 && (
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  {/* Seller Left */}
                  <div>
                    <Link
                      to={`/shop/preview/${data.shopeId}`}
                      className="flex items-center gap-3"
                    >
                      <img
                        src={`${data.shop.avatar.url}`}
                        className="h-[55px] w-[55px] rounded-full object-cover shadow"
                        alt="Shop"
                      />
                      <div>
                        <h3 className="font-semibold">{data.shop.name}</h3>
                        <p className="text-gray-500">
                          {averageRating.toFixed(1)} ⭐ ({totalReviewLength}{" "}
                          reviews)
                        </p>
                      </div>
                    </Link>
                    <p className="mt-3 text-gray-600">
                      {data.shop.desciption}
                    </p>
                  </div>

                  {/* Seller Right */}
                  <div className="space-y-2 text-gray-700">
                    <p>
                      <span className="font-semibold">Joined:</span>{" "}
                      {data.createdAt.slice(0, 10)}
                    </p>
                    <p>
                      <span className="font-semibold">Total Products:</span>{" "}
                      {products?.length}
                    </p>
                    <p>
                      <span className="font-semibold">Total Reviews:</span>{" "}
                      {totalReviewLength}
                    </p>
                    <Link to={`/shop/preview/${data.shopeId}`}>
                      <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                        Visit Shop
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetail;
