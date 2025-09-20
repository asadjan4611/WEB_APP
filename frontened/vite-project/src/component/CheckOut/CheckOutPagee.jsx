import React, { useState, useEffect } from "react";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../style/style";
import { backned_Url } from "../../serverRoute";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + Number(item.count) * Number(item.discountPrice),
    0
  );
  const shipping = (subTotalPrice * 0.1).toFixed(2);
  const discountPercentengePrice = couponCodeData ? discountPrice : "";
  const totalPrice = couponCodeData
    ? (
        Number(subTotalPrice) +
        Number(shipping) -
        discountPercentengePrice
      ).toFixed(2)
    : Number(subTotalPrice) + Number(shipping);

  const paymentSubmit = () => {
    if (!address1 || !address2 || !zipCode || !country || !city) {
      toast.error("Please choose your delivery address!");
    } else {
      const shippingAddress = { address1, address2, zipCode, country, city };
      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        discountPrice,
        shipping,
        shippingAddress,
        user,
      };
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;
    await axios
      .get(`${backned_Url}/api/coupan/coupan-verified/${name}`)
      .then((res) => {
        if (res.data.coupanCode === null) {
          toast.error("Coupan Code does not exist");
          setCouponCode("");
        }
        const shopeId = res.data.coupanCode?.seller._id;
        const CoupanCodeValue = res.data.coupanCode?.value;

        if (res.data.coupanCode !== null) {
          const isCoupanvalid =
            cart && cart.filter((item) => item.shop._id === shopeId);

          if (!isCoupanvalid || isCoupanvalid.length === 0) {
            toast.error("Coupan Code is not valid for this shop");
            setCouponCode("");
            setDiscountPrice("");
          } else {
            const eligiblePrice = isCoupanvalid.reduce(
              (acc, item) => acc + item.count * item.discountPrice,
              0
            );
            const discountPrice = (eligiblePrice * CoupanCodeValue) / 100;
            setDiscountPrice(discountPrice);
            setCouponCodeData(res.data.coupanCode);
          }
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
      });
  };

  return (
    <div className="w-full flex flex-col items-center py-10 bg-gray-50">
      <div className="w-[95%] lg:w-[75%] grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Info */}
        <ShippingInfo
          user={user}
          country={country}
          setCountry={setCountry}
          city={city}
          setCity={setCity}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          address1={address1}
          setAddress1={setAddress1}
          address2={address2}
          setAddress2={setAddress2}
          zipCode={zipCode}
          setZipCode={setZipCode}
        />

        {/* Cart Summary */}
        <CartData
          handleSubmit={handleSubmit}
          totalPrice={totalPrice}
          shipping={shipping}
          subTotalPrice={subTotalPrice}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          discountPercentengePrice={discountPercentengePrice}
        />
      </div>

      {/* Payment Button */}
      <div
        className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md mt-10 cursor-pointer transition"
        onClick={paymentSubmit}
      >
        Go to Payment
      </div>
    </div>
  );
};

/* ---------------- Shipping Info ---------------- */
const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-md p-6">
      <h5 className="text-lg font-semibold text-gray-700 border-b pb-3 mb-4">
        Shipping Address
      </h5>

      <form className="space-y-4">
        {/* Full Name & Email */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              value={user && user.name}
              required
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={user && user.email}
              required
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>
        </div>

        {/* Phone & Zip */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm mb-1">Phone</label>
            <input
              type="number"
              value={user && user.phoneNumber}
              required
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm mb-1">Zip Code</label>
            <input
              type="number"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>
        </div>

        {/* Country & City */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm mb-1">Country</label>
            <select
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Choose Country</option>
              {Country.getAllCountries().map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2">
            <label className="block text-sm mb-1">City</label>
            <select
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Choose City</option>
              {State.getStatesOfCountry(country).map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Address */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm mb-1">Address 1</label>
            <input
              type="text"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              required
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm mb-1">Address 2</label>
            <input
              type="text"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              required
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>
        </div>
      </form>

      {/* Saved Address */}
      <h5
        className="text-pink-600 mt-4 font-medium cursor-pointer hover:underline"
        onClick={() => setUserInfo(!userInfo)}
      >
        Choose from saved address
      </h5>
      {userInfo && (
        <div className="mt-2 space-y-2">
          {user &&
            user.addresses.map((item, index) => (
              <label
                key={index}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="accent-pink-500"
                  onClick={() =>
                    setAddress1(item.address1) ||
                    setAddress2(item.address2) ||
                    setZipCode(item.zipCode) ||
                    setCountry(item.country) ||
                    setCity(item.city)
                  }
                />
                <span className="text-sm">{item.addressType}</span>
              </label>
            ))}
        </div>
      )}
    </div>
  );
};

/* ---------------- Cart Data ---------------- */
const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentengePrice,
}) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-md p-6">
      <h5 className="text-lg font-semibold text-gray-700 border-b pb-3 mb-4">
        Order Summary
      </h5>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subTotalPrice}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">${shipping}</span>
        </div>
        <div className="flex justify-between text-sm border-b pb-3">
          <span className="text-gray-600">Discount</span>
          <span className="font-medium text-green-600">
            {discountPercentengePrice
              ? "- $" + discountPercentengePrice.toString()
              : "-"}
          </span>
        </div>
        <div className="flex justify-between text-base font-semibold text-gray-800">
          <span>Total</span>
          <span>${totalPrice}</span>
        </div>
      </div>

      {/* Coupon */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
        />
        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md font-medium transition"
        >
          Apply Code
        </button>
      </form>
    </div>
  );
};

export default Checkout;
