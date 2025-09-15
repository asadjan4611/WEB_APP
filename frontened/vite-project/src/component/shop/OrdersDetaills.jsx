import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import styles from "../../style/style";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSellerOrder } from "../../assets/redux/actions/order";
import { backned_Url } from "../../serverRoute";
import axios from "axios";
import { config } from "dotenv";
import { toast } from "react-toastify";
const OrderDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const { seller } = useSelector((state) => state.seller);
  const { shopOrders, isLoading } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(getSellerOrder(seller._id));
  }, [dispatch]);

  const data = shopOrders && shopOrders.find((item) => item._id === id);

  const orderUpdateHandler = async () => {
    if (status === "") {
      return toast.error("please choose any status");
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .put(
        `${backned_Url}/api/order/update-order-status/${data._id}`,
        {
          status,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success("Update Order successfully");
        navigate("/dashboard-orders");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
      });
  };

  
   const orderRefundUpdateHandler =async()=>{
    console.log("orderRefundUpdateHandler is calling")
   await axios.put(
    `${backned_Url}/api/order/order-refund-success/${data._id}`,
        {
          status,
        },
        {
          withCredentials: true,
        }
   ).then((res)=>{
       toast.success("Update Order successfully");
        // navigate("/dashboard-orders");
   }).catch((err)=>{
    toast.error(err.response?.data?.message)
   })
   } 

   console.log(data?.status)


  return (
    <div className={`${styles.section} py-4 min-h-screen `}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill color="crimson" size={30} />
          <h2 className="pl-2 text-[25px]">Order Details</h2>
        </div>
        <Link to="/dashboard-orders">
          <div
            className={`${styles.button} !bg-[#fce1e5] !rounded-[4px] text-[#e94560] font-[600px] H-[45px] text-[18px] `}
          >
            Order List
          </div>
        </Link>
      </div>
      <div className="w-full flex item-center justify-between pt-6 ">
        <h5>
          OrderID <span>{data?._id.slice(0, 8)}</span>
        </h5>
        <h5>
          Placed on : <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      {/* order items */}
      <br />
      <br />
      {data &&
        data?.cart.map((item, index) => (
          <div className="w-full flex items-center mb-5">
            <img
              className="h-[80px] w-[80px]"
              src={`${backned_Url}/uploads/${item.images[0]}`}
              alt=""
            />
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item.name}</h5>

              <h5 className="pl-3 text-[20px]">
                US$ {item.discountPrice}*{item.count}
              </h5>
            </div>
          </div>
        ))}

      <div className="border-t w-full text-right ">
        <h5 className="pl-3 text-[20px]">
          Total Price: <strong>US${data.totalPrice}</strong>
        </h5>
      </div>

      <br />
      <br />
      <div className="w-full md:flex items-center ">
        <div className="w-full md:w-[60%]">
          <h4 className="pt-2 text-[20px] font-600">Shipping Address:</h4>
          <h4 className="pt-2 text-[20px] font-600">
            {data?.shippingAddress.address1 +
              "            ," +
              data?.shippingAddress.address2}
          </h4>
          <h4 className="pt-2 text-[20px] font-600">
            {data?.shippingAddress.country}
          </h4>
          <h4 className="pt-2 text-[20px] font-600">
            {data?.shippingAddress.city}
          </h4>{" "}
          <h4 className="pt-2 text-[20px] font-600">
            {data?.user?.phoneNumber}
          </h4>
        </div>
        <div className="w-full md:border-t  mt-3 md:w-[40%]">
          <h4 className="pt-2 text-[20px] font-600">Payment Info :</h4>
          <h4 className="pt-2 text-[20px] font-600">
            Status :
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
          </h4>
        </div>
      </div>

      <br />
      <br />
      <h4 className="pt-2 text-[20px] font-600">Order Status :</h4>
      { data?.status !== "Refund Processing"  &&  data?.status !== "Refund Success"  ? (
        <select
          className="w-[200px] rounded-[5px] border"
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
            .map((options, index) => (
              <option key={index} value={options}>
                {options}
              </option>
            ))}
        </select>
      ) : 
      <select
        className="w-[200px] rounded-[5px] border"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        {["Refund Processing", "Refund Success"]
          .slice(["Refund Processing", "Refund Success"].indexOf(data?.status))
          .map((options, index) => (
            <option key={index} value={options}>
              {options}
            </option>
          ))}
      </select> 
}
      <div
        onClick={data?.status === "Refund Processing" ? orderUpdateHandler : orderRefundUpdateHandler   }
        className={`${styles.button} mt-5 !bg-[#FCE1e6] text-[#E94560] font-[600px] !h-[45px] text-[18px]`}
      >
        Update Status
      </div>
    </div>
  );
};

export default OrderDetails;
