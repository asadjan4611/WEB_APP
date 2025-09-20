import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserOrder } from "../../assets/redux/actions/order";

const steps = [
  "Processing",
  "Transferred to delivery partner",
  "Shipping",
  "Received",
  "On the way",
  "Delivered",
  "Refund Processing",
  "Refund Success",
];

const TrackOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { userOrders } = useSelector((state) => state.order);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?._id) {
      dispatch(getUserOrder(user._id));
    }
  }, [dispatch, user?._id]);

  const data = userOrders?.find((item) => item._id === id);

  const currentStep = steps.indexOf(data?.status);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 py-10 bg-gray-50">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
          Track Your Order
        </h2>

        {/* Progress Bar */}
        <div className="relative flex items-center justify-between w-full mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex-1 flex items-center relative"
            >
              {/* Line */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-1/2 left-1/2 h-1 w-full -translate-x-1/2 ${
                    index < currentStep ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
              )}

              {/* Circle */}
              <div
                className={`z-10 w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold ${
                  index <= currentStep ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Status Text */}
        <div className="text-center">
          <h5 className="text-xl font-medium text-gray-700">
            {data?.status
              ? `Current Status: ${data.status}`
              : "Order not found"}
          </h5>
          <p className="text-gray-500 mt-2">
            {data?.status === "Processing" &&
              "Your order is being prepared at the shop."}
            {data?.status === "Transferred to delivery partner" &&
              "Your order has been handed to our delivery partner."}
            {data?.status === "Shipping" &&
              "Your order is on the way with the delivery partner."}
            {data?.status === "Received" &&
              "Your order has reached your city, our partner will deliver it soon."}
            {data?.status === "On the way" &&
              "Our delivery man is on the way to deliver your order."}
            {data?.status === "Delivered" &&
              "Your product has been successfully delivered."}
            {data?.status === "Refund Processing" &&
              "Your refund is being processed, please wait."}
            {data?.status === "Refund Success" &&
              "Your refund was successful."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
