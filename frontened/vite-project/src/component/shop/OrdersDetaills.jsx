import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSellerOrder } from "../../assets/redux/actions/order";
import { backned_Url } from "../../serverRoute";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../style/style";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const { seller } = useSelector((state) => state.seller);
  const { shopOrders } = useSelector((state) => state.order);

  useEffect(() => {
    if (seller?._id) dispatch(getSellerOrder(seller._id));
  }, [dispatch, seller]);

  const data = shopOrders && shopOrders.find((item) => item._id === id);

  const orderUpdateHandler = async () => {
    if (status === "") return toast.error("Please choose a status");

    try {
      await axios.put(
        `${backned_Url}/api/order/update-order-status/${data._id}`,
        { status },
        { withCredentials: true }
      );
      toast.success("Order updated successfully");
      navigate("/dashboard-orders");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const orderRefundUpdateHandler = async () => {
    try {
      await axios.put(
        `${backned_Url}/api/order/order-refund-success/${data._id}`,
        { status },
        { withCredentials: true }
      );
      toast.success("Refund updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 md:px-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BsFillBagFill className="text-red-500" size={28} />
          <h2 className="text-2xl font-semibold">Order Details</h2>
        </div>
        <Link
          to="/dashboard-orders"
          className="px-4 py-2 bg-red-100 text-red-600 font-medium rounded-md hover:bg-red-200 transition"
        >
          Back to Orders
        </Link>
      </div>

      {/* Order Info */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between text-gray-600 text-sm">
          <p>
            <span className="font-semibold">Order ID:</span>{" "}
            {data?._id.slice(0, 8)}
          </p>
          <p>
            <span className="font-semibold">Placed on:</span>{" "}
            {data?.createdAt?.slice(0, 10)}
          </p>
        </div>
      </div>

      {/* Cart Items */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Items</h3>
        {data?.cart?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border-b last:border-none pb-4 mb-4 last:pb-0 last:mb-0"
          >
            <img
              src={item.images[0].url}
              alt={item.name}
              className="w-20 h-20 rounded-md object-cover border"
            />
            <div className="flex-1">
              <h4 className="text-md font-medium">{item.name}</h4>
              <p className="text-gray-600">
                US$ {item.discountPrice} × {item.count}
              </p>
            </div>
          </div>
        ))}
        <div className="text-right mt-4">
          <p className="text-lg font-semibold">
            Total: <span className="text-red-600">US${data?.totalPrice}</span>
          </p>
        </div>
      </div>

      {/* Shipping & Payment */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
          <p className="text-gray-600">{data?.shippingAddress.address1}</p>
          <p className="text-gray-600">{data?.shippingAddress.address2}</p>
          <p className="text-gray-600">{data?.shippingAddress.city}</p>
          <p className="text-gray-600">{data?.shippingAddress.country}</p>
          <p className="text-gray-600 mt-2">
            📞 {data?.user?.phoneNumber || "No phone"}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Payment Info</h3>
          <p className="text-gray-600">
            Status:{" "}
            <span
              className={`font-medium ${
                data?.paymentInfo?.status === "succeeded"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {data?.paymentInfo?.status || "Not Paid"}
            </span>
          </p>
        </div>
      </div>

      {/* Order Status Update */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Update Order Status</h3>
        {data?.status !== "Refund Processing" &&
        data?.status !== "Refund Success" ? (
          <select
            className="w-full md:w-64 border rounded-md p-2 focus:ring focus:ring-red-300"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {[
              "Processing",
              "Transferred to delivery partner",
              "Shipping",
              "Received",
              "On the way",
              "Delivered",
            ]
              .slice(
                [
                  "Processing",
                  "Transferred to delivery partner",
                  "Shipping",
                  "Received",
                  "On the way",
                  "Delivered",
                ].indexOf(data?.status)
              )
              .map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
          </select>
        ) : (
          <select
            className="w-full md:w-64 border rounded-md p-2 focus:ring focus:ring-red-300"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {["Refund Processing", "Refund Success"]
              .slice(
                ["Refund Processing", "Refund Success"].indexOf(data?.status)
              )
              .map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
          </select>
        )}

        <button
          onClick={
            data?.status === "Refund Processing"
              ? orderRefundUpdateHandler
              : orderUpdateHandler
          }
          className="mt-5 px-6 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition"
        >
          Update Status
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
