import React, { useEffect, useState } from "react";
import styles from "../../style/style";
import { useNavigate } from "react-router-dom";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { backned_Url } from "../../serverRoute";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const element = useElements();
  const stripe = useStripe();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const createOrder = (data, action) => {
    return action.order
      .create({
        purchase_units: [
          {
            description: "Order Payment",
            amount: {
              currency_code: "USD",
              value: orderData?.totalPrice,
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderId) => orderId);
  };

  const onAprove = async (data, action) => {
    return action.order.capture().then(function (details) {
      const { payer } = details;
      let paymentInfo = payer;
      if (paymentInfo !== undefined) {
        paypalHandlertHandler(paymentInfo);
      }
    });
  };

  const paypalHandlertHandler = async (paymentInfo) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: "succeeded",
      type: "Paypal",
    };

    await axios
      .post(`${backned_Url}/api/order/create-order`, order, config, {
        withCreditionals: true,
      })
      .then(() => {
        setOpen(false);
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder ", JSON.stringify([]));
        navigate("/order/success");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };

  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.post(
        "http://localhost:8000/api/stripe/process",
        paymentData,
        config
      );
      console.log("Stripe client_secret:", data.client_secret);
    } catch (error) {
      toast.error(error);
    }
  };

  const cashOnDeleiveryHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    order.paymentInfo = { type: "Cash on Delivery" };

    await axios
      .post(`${backned_Url}/api/order/create-order`, order, config)
      .then(() => {
        setOpen(false);
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder ", JSON.stringify([]));
        navigate("/order/success");
        window.location.reload();
      })
      .catch((error) => toast.error(error));
  };

  return (
    <div className="w-full flex flex-col items-center py-10 bg-gray-50 min-h-screen">
      <div className="w-[90%] lg:w-[70%] grid md:grid-cols-3 gap-8">
        {/* Payment Options */}
        <div className="md:col-span-2">
          <PaymentInfo
            user={user}
            open={open}
            setOpen={setOpen}
            onAprove={onAprove}
            createOrder={createOrder}
            paymentHandler={paymentHandler}
            cashOnDeleiveryHandler={cashOnDeleiveryHandler}
          />
        </div>

        {/* Order Summary */}
        <div>
          <CardData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({
  user,
  open,
  setOpen,
  onAprove,
  createOrder,
  paymentHandler,
  cashOnDeleiveryHandler,
}) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="w-full bg-white rounded-xl shadow-md p-6 space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 border-b pb-3">
        Choose Payment Method
      </h3>

      {/* Debit / Credit Card */}
      <div>
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setSelect(1)}
        >
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${select === 1 ? "border-pink-500" : "border-gray-400"}`}>
            {select === 1 && <div className="w-3 h-3 bg-pink-500 rounded-full" />}
          </div>
          <span className="text-gray-700 font-medium">Pay with Card</span>
        </div>

        {select === 1 && (
          <form className="mt-4 space-y-4" onSubmit={paymentHandler}>
            <input
              type="text"
              value={user?.name}
              placeholder="Name on Card"
              required
              className={`${styles.input}`}
            />
            <CardNumberElement className={`${styles.input}`} />
            <div className="flex gap-4">
              <CardExpiryElement className={`${styles.input}`} />
              <CardCvcElement className={`${styles.input}`} />
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-semibold transition"
            >
              Pay Now
            </button>
          </form>
        )}
      </div>

      {/* Paypal */}
      <div>
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setSelect(2)}
        >
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${select === 2 ? "border-pink-500" : "border-gray-400"}`}>
            {select === 2 && <div className="w-3 h-3 bg-pink-500 rounded-full" />}
          </div>
          <span className="text-gray-700 font-medium">Pay with PayPal</span>
        </div>

        {select === 2 && (
          <div className="mt-4">
            <button
              onClick={() => setOpen(true)}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-semibold transition"
            >
              Continue to PayPal
            </button>

            {open && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[450px] p-6 relative">
                  <RxCross1
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-red-500"
                  />
                  <PayPalScriptProvider
                    options={{
                      "client-id": "AfOMkuXEzLRaNhT8NYsp7jBlB-DAh1GKsTCIP7QFJak489cxQSxqcYIQFIbUvRhJkfzW0_TqEqQdpusn",
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      onApprove={onAprove}
                      createOrder={createOrder}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cash on Delivery */}
      <div>
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setSelect(3)}
        >
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${select === 3 ? "border-pink-500" : "border-gray-400"}`}>
            {select === 3 && <div className="w-3 h-3 bg-pink-500 rounded-full" />}
          </div>
          <span className="text-gray-700 font-medium">Cash on Delivery</span>
        </div>

        {select === 3 && (
          <form className="mt-4" onSubmit={cashOnDeleiveryHandler}>
            <button
              type="submit"
              className="w-full bg-pink-500 cursor-pointer hover:bg-pink-600 text-white py-2 rounded-lg font-semibold transition"
            >
              Confirm Order
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const CardData = ({ orderData }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-3">
        Order Summary
      </h3>
      <div className="flex justify-between text-gray-600">
        <span>Subtotal</span>
        <span className="font-medium">${orderData.subTotalPrice}</span>
      </div>
      <div className="flex justify-between text-gray-600">
        <span>Shipping</span>
        <span className="font-medium">${orderData.shipping}</span>
      </div>
      <div className="flex justify-between text-gray-600 border-b pb-2">
        <span>Discount</span>
        <span className="font-medium text-green-600">
          {orderData?.discountPrice ? `- $${orderData.discountPrice}` : "-"}
        </span>
      </div>
      <div className="flex justify-between text-lg font-bold text-gray-800 pt-2">
        <span>Total</span>
        <span>${orderData.totalPrice}</span>
      </div>
    </div>
  );
};

export default Payment;
