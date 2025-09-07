import React, { useEffect, useState } from "react";
import styles from "../../style/style";
import { useNavigate } from "react-router-dom";
import {
  CardNumberElement,
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { backned_Url } from "../../serverRoute";
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
            description: "Sunflower",
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
      .then((orderId) => {
        return orderId;
      });
  };

  const onAprove = async (data, action) => {
    console.log("add");
  };

  const paypalHandlertHandler = async (paymentInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
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
      .then((res) => {
        console.log(res);
        setOpen(false);
        navigate("/order/success");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder ", JSON.stringify([]));
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
      console.log("paymentData is ", paymentData);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:8000/api/stripe/process",
        paymentData,
        config
      );
      const client_secret = data.client_secret;
      console.log(client_secret);
      //   if (!stripe || !element) {
      //     return;
      //   }
      //   const result = await stripe.confirmCardPayment(client_secret, {
      //     payment_method: {
      //       card: elements.getElements(CardNumberElement),
      //     },
      //   });

      //   if (result?.error) {
      //     toast.error(result?.error?.message);
      //   } else {
      //     if (result.paymentIntent.status === "succeded") {
      //       toast.success("Payment is successfull");
      //       order.paymentInfo = {
      //         id: result.paymentIntent.id,
      //         status: result.paymentIntent.status,
      //         type: "credit Card",
      //       };

      //   await axios
      //     .post(`${backned_Url}/api/order/create-order`, order, config, {
      //       withCreditionals: true,
      //     })
      //     .then((res) => {
      //       console.log(res);
      // setOpen(false);
      // navigate("/order/success")
      // localStorage.setItem("cartItems",JSON.stringify([]));
      // localStorage.setItem("latestOrder ",JSON.stringify([]));
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //       toast.error(error);
      //     });
      //     }
      //   }
    } catch (error) {
      toast.error(error);
    }
  };

  const cashOnDeleiveryHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] lg:w-[70%] block md:flex">
        <div className="w-full md:w-[65%]">
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
        <div className="w-full md:w-[35%] md:mt-0 mt-8">
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
    <div className="w-full md:w-[95%] rounded-md p-5 pb-8 bg-[#ffffff35]">
      {/* select button  with pay with debit card*/}
      <div className={`w-full pb-5 ${select === 1 ? "border-b" : ""} mb-2`}>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setSelect(1)}
        >
          <div className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] flex items-center justify-center border-[#1d1a1acb]">
            {select === 1 ? (
              <div className="h-[13px] w-[13px] rounded-full bg-[#1d1a1acb]" />
            ) : null}
          </div>

          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Debit/Credit card
          </h4>
        </div>
        {select === 1 && (
          <div className="w-full mt-3">
            <form className="w-full" onSubmit={paymentHandler}>
              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-">Name on Card</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    required
                    value={user && user.name}
                    placeholder="Enter your Card Name xxxx"
                    className={`${styles.input} text-[#444] !w-[95%]`}
                  />
                </div>

                <div className="w-[50%]">
                  <label className="block pb-">Expire Date</label>
                  <CardExpiryElement
                    className={`${styles.input}`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-">Card Number</label>
                  <CardNumberElement
                    className={`${styles.input}`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>

                <div className="w-[50%]">
                  <label className="block pb-">CVC</label>
                  <CardCvcElement
                    className={`${styles.input}`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <input
                type="submit"
                value="Submit"
                className={`${styles.button} !w-[20%]  !h-[45px] !rounded-md text-white !bg-[#f63b60]  mb-3 cursor-pointer`}
              />
            </form>
          </div>
        )}
      </div>

      {/* select button with paypal */}
      <div className={`w-full pb-5 ${select === 2 ? "border-b" : ""} mb-2`}>
        <div
          onClick={() => setSelect(2)}
          className="flex flex-row items-center cursor-pointer"
        >
          <div className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] flex items-center justify-center border-[#1d1a1acb]">
            {select === 2 && (
              <div className="h-[13px] w-[13px] rounded-full bg-[#1d1a1acb]" />
            )}
          </div>

          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Paypal
          </h4>
        </div>

        {select === 2 && (
          <div className="w-full mt-5">
            <form className="w-full" onSubmit={paymentHandler}>
              <div className="w-full flex flex-col pb-3">
                <div className="w-[50%]">
                  <label className="block pb-3">PayPal mail</label>
                  <input
                    type="text"
                    required
                    className={`${styles.input} !w-[95%]`}
                  />
                </div>

                <input
                  type="submit"
                  value="Submit"
                  className={`${styles.button} !w-[20%] !h-[45px] !rounded-md text-white !bg-[#f63b60] mb-3 cursor-pointer`}
                />
              </div>
            </form>
          </div>
        )}
      </div>

      {/* cash o deleievry */}
      <div className={`w-full pb-5 ${select === 3 ? "border-b" : ""} mb-2`}>
        <div
          onClick={() => setSelect(3)}
          className="flex flex-row items-center cursor-pointer"
        >
          <div className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] flex items-center justify-center border-[#1d1a1acb]">
            {select === 3 && (
              <div className="h-[13px] w-[13px] rounded-full bg-[#1d1a1acb]" />
            )}
          </div>

          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Cash on Delivery
          </h4>
        </div>

        {select === 3 && (
          <div className="w-full mt-5">
            <form className="w-full" onSubmit={paymentHandler}>
              <div className="w-full">
                <input
                  type="submit"
                  value="Confirm"
                  className={`${styles.button} !w-[200px] !h-[45px] !rounded-md text-white !bg-[#f63b60] cursor-pointer`}
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const CardData = ({
  orderData,
  //   handleSubmit,
  //   totalPrice,
  //   shipping,
  //   subTotalPrice,
  //   couponCode,
  //   setCouponCode,
  //   discountPercentengePrice,
}) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${orderData.subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">${orderData.shipping}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          {" "}
          -{" "}
          {orderData.discountPrice
            ? "$" + orderData.discountPrice.toString()
            : ""}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        ${orderData.totalPrice}
      </h5>
      <br />
      <form>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Coupoun code xxxx-xxxxx"
          // value={}
          // onChange={(e) => (e.target.value)}
          required
        />
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Apply code"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Payment;
