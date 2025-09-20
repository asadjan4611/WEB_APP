import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { backned_Url } from "../serverRoute";
import { getUserOrder } from "../assets/redux/actions/order";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";

const UserOrderDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const { user } = useSelector((state) => state.user);
  const { userOrders } = useSelector((state) => state.order);

  useEffect(() => {
    if (user?._id) {
      dispatch(getUserOrder(user._id));
    }
  }, [dispatch, user?._id]);

  const data = userOrders && userOrders.find((item) => item._id === id);

  const reviewHandler = async () => {
    if (!selectedItem) return;
    try {
      const res = await axios.put(
        `${backned_Url}/api/product/create-new-review`,
        {
          user,
          rating,
          comment,
          productId: selectedItem._id,
          orderId: id,
        },
        { withCredentials: true }
      );

      toast.success("Reviewed Successfully");
      setComment("");
      setRating(1);
      setOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
      setComment("");
      setRating(1);
    }
  };

  const refundHandler = async () => {
    try {
      const res = await axios.put(
        `${backned_Url}/api/order/refund-order/${id}`,
        { status: "Refund Processing" }
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Refund request failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <BsFillBagFill className="text-indigo-600" size={28} />
          <h2 className="text-2xl font-semibold">Order Details</h2>
        </div>
        <h5 className="text-gray-600">
          Placed on:{" "}
          <span className="font-medium">{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      {/* Order Info */}
      <div className="flex justify-between items-center mt-4">
        <h5 className="text-lg">
          <span className="font-semibold">Order ID:</span>{" "}
          {data?._id.slice(0, 8)}
        </h5>
        <h5 className="text-lg font-semibold text-indigo-600">
          Total: US${data?.totalPrice}
        </h5>
      </div>

      {/* Items */}
      <div className="mt-6 space-y-5">
        {data?.cart.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition"
          >
            <img
              className="h-[80px] w-[80px] rounded object-cover"
              src={item.images[0].url}
              alt={item.name}
            />
            <div className="flex-1 ml-4">
              <h5 className="text-lg font-medium">{item.name}</h5>
              <p className="text-gray-600">
                US${item.discountPrice} × {item.count}
              </p>
            </div>
            {item.isReviewed || item.status === "Delivered" ? null : (
              <button
                onClick={() => {
                  setSelectedItem(item);
                  setOpen(true);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Write Review
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <RxCross1 size={22} />
            </button>

            <h2 className="text-xl font-semibold text-center mb-4">
              Write a Review
            </h2>

            {/* Item Preview */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={selectedItem?.images[0].url}
                className="w-[70px] h-[70px] rounded object-cover"
                alt=""
              />
              <div>
                <h4 className="text-lg font-medium">{selectedItem?.name}</h4>
                <p className="text-gray-600">
                  US${selectedItem?.discountPrice} × {selectedItem?.count}
                </p>
              </div>
            </div>

            {/* Rating */}
            <h5 className="font-medium mb-2">Your Rating *</h5>
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    size={28}
                    className="text-yellow-500 cursor-pointer"
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    size={28}
                    className="text-gray-400 cursor-pointer"
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>

            {/* Comment */}
            <label className="block mb-1 font-medium">Your Comment</label>
            <textarea
              className="w-full border rounded-md p-2 mb-4 focus:ring-2 focus:ring-indigo-400 outline-none"
              rows="4"
              placeholder="Share your thoughts..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            {/* Submit */}
            <button
              onClick={rating > 0 ? reviewHandler : null}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}

      {/* Shipping & Payment */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg bg-gray-50">
          <h4 className="text-lg font-semibold mb-2">Shipping Address</h4>
          <p>{data?.shippingAddress.address1}, {data?.shippingAddress.address2}</p>
          <p>{data?.shippingAddress.city}, {data?.shippingAddress.country}</p>
          <p>Phone: {data?.user?.phoneNumber}</p>
        </div>

        <div className="p-4 border rounded-lg bg-gray-50">
          <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
          <p>
            Status:{" "}
            <span className="font-medium text-indigo-600">
              {data?.paymentInfo?.status || "Not Paid"}
            </span>
          </p>
          {data?.status === "Delivered" && (
            <button
              onClick={refundHandler}
              className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Request Refund
            </button>
          )}
        </div>
      </div>

      {/* Send Message */}
      <div className="mt-6">
        <Link to="/user-inbox">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
            Send Message
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserOrderDetail;
