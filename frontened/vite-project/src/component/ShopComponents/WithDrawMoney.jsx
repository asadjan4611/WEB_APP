import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSellerOrder } from "../../assets/redux/actions/order";
import { getAllProduct } from "../../assets/redux/actions/product";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { loadSeller } from "../../assets/redux/actions/user";
import { backned_Url } from "../../serverRoute";

const WithDrawMoney = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { shopOrders } = useSelector((state) => state.order);

  const [deliveredData, setDeliveredData] = useState(null);
  const [open, setOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(50);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userBalance, setUserBalance] = useState(null);

  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankCountry: "",
    bankSwiftCode: "",
    bankAccountNumber: "",
    bankHolderName: "",
    bankAddress: "",
  });

  useEffect(() => {
    dispatch(getSellerOrder(seller?._id));
    dispatch(getAllProduct(seller?._id));

    const orderData =
      shopOrders && shopOrders.filter((item) => item.status === "Delivered");
    setDeliveredData(orderData);
  }, [dispatch]);

  useEffect(() => {
    const getUserBalance = async () => {
      try {
        const res = await axios.get(
          `${backned_Url}/api/shop/get-shop-info/${seller._id}`
        );
        setUserBalance(res.data.sellerInfo.availableBalance);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch balance");
      }
    };
    getUserBalance();
  }, [seller]);

  const availableBalance = userBalance;

  // ---------- Handlers ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const withdrawMethod = { ...bankInfo };

    try {
      await axios.put(
        `${backned_Url}/api/shop/update-payment-methods`,
        { withdrawMethod },
        { withCredentials: true }
      );
      toast.success("Withdraw method added successfully!");
      dispatch(loadSeller());
      setBankInfo({
        bankName: "",
        bankCountry: "",
        bankSwiftCode: "",
        bankAccountNumber: "",
        bankHolderName: "",
        bankAddress: "",
      });
      setPaymentMethod(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding method");
    }
  };

  const deleteHandler = async () => {
    try {
      await axios.delete(`${backned_Url}/api/shop/delete-withdraw-method`, {
        withCredentials: true,
      });
      toast.success("Withdraw method deleted successfully!");
      dispatch(loadSeller());
    } catch (err) {
      toast.error("Failed to delete withdraw method");
    }
  };

  const withdrawHandler = async () => {
    try {
      if (withdrawAmount < 50 || withdrawAmount > availableBalance) {
        toast.error("Invalid amount to withdraw!");
      } else {
        setLoading(true);
        await axios.post(
          `${backned_Url}/api/withDraw/create-withdraw-request`,
          { amount: withdrawAmount },
          { withCredentials: true }
        );
        setWithdrawAmount(50);
        toast.success("Withdraw request sent successfully!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Withdraw failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded-lg shadow-md flex flex-col items-center justify-center p-8">
        <h5 className="text-xl font-semibold text-gray-700 mb-2">
          Available Balance
        </h5>
        <p className="text-3xl font-bold text-green-600 mb-6">
          ${availableBalance}
        </p>

        <button
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
          onClick={() =>
            availableBalance < 50
              ? toast.error("Balance must be at least $50 to withdraw")
              : setOpen(true)
          }
        >
          Withdraw
        </button>
      </div>

      {/* ---------- Modal ---------- */}
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
          <div
            className={`w-[95%] md:w-[50%] bg-white shadow-lg rounded-lg transition-all duration-300 ${
              paymentMethod ? "h-[80vh] overflow-y-auto" : "min-h-[40vh]"
            } p-5`}
          >
            {/* Close */}
            <div className="w-full flex justify-end">
              <RxCross1
                size={25}
                onClick={() => {
                  setOpen(false);
                  setPaymentMethod(false);
                }}
                className="cursor-pointer hover:text-red-500"
              />
            </div>

            {paymentMethod ? (
              <>
                <h3 className="text-2xl font-semibold text-center mb-6">
                  Add New Withdraw Method
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { label: "Bank Name", key: "bankName" },
                    { label: "Bank Country", key: "bankCountry" },
                    { label: "Bank Swift Code", key: "bankSwiftCode" },
                    { label: "Bank Account Number", key: "bankAccountNumber" },
                    { label: "Bank Holder Name", key: "bankHolderName" },
                    { label: "Bank Address", key: "bankAddress" },
                  ].map((field, i) => (
                    <div key={i}>
                      <label className="block text-gray-600 font-medium">
                        {field.label} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={bankInfo[field.key]}
                        onChange={(e) =>
                          setBankInfo({ ...bankInfo, [field.key]: e.target.value })
                        }
                        placeholder={`Enter ${field.label}`}
                        className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  ))}

                  <button
                    type="submit"
                    className="w-full mt-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Add Method
                  </button>
                </form>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-4">
                  Available Withdraw Methods
                </h3>

                {seller && seller?.withdrawMethod ? (
                  <div className="space-y-4">
                    {/* Withdraw Method Info */}
                    <div className="flex justify-between items-center border p-3 rounded">
                      <div>
                        <p className="text-gray-700">
                          <strong>Account Number:</strong>{" "}
                          {"*".repeat(
                            seller?.withdrawMethod.bankAccountNumber.length - 3
                          ) +
                            seller?.withdrawMethod.bankAccountNumber.slice(-3)}
                        </p>
                        <p className="text-gray-700">
                          <strong>Bank:</strong> {seller?.withdrawMethod.bankName}
                        </p>
                      </div>
                      <AiOutlineDelete
                        size={25}
                        className="cursor-pointer text-red-500 hover:text-red-700"
                        onClick={deleteHandler}
                      />
                    </div>

                    {/* Withdraw Action */}
                    <div>
                      <p className="mb-2 text-gray-600">
                        Available Balance:{" "}
                        <span className="font-semibold">
                          ${availableBalance}
                        </span>
                      </p>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          placeholder="Amount..."
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          className="border rounded p-2 flex-1"
                        />
                        <button
                          onClick={withdrawHandler}
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                          {loading ? "Processing..." : "Withdraw"}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">
                      No withdraw methods available!
                    </p>
                    <button
                      className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      onClick={() => setPaymentMethod(true)}
                    >
                      Add New Method
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WithDrawMoney;
