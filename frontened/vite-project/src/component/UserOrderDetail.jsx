import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import styles from "../style/style";
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
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [slectedItem, setSelectedItem] = useState(null);
  const { user } = useSelector((state) => state.user);
  const { userOrders, isLoading } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(getUserOrder(user?._id));
  }, [dispatch]);

  const data = userOrders && userOrders.find((item) => item._id === id);
  const reviewHandler = async (e) => {
    const productId = slectedItem._id;
    const orderId = id;
    await axios
      .put(
        `${backned_Url}/api/product/create-new-review`,
        {
          user,
          rating,
          comment,
          productId,
          orderId,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("res is ", res);
        toast.success("Reviewd Successfully");
        setComment("");
        setRating(null);
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
        setComment("");
        setRating(null);
      });
  };

  const refundHandler = async (e) => {
    await axios
      .put(`${backned_Url}/api/order/refund-order/${id}`, {
        status: "Refund Processing",
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
      });
  };

  return (
    <div className={`${styles.section} py-4 min-h-screen `}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill color="crimson" size={30} />
          <h2 className="pl-2 text-[25px]">Order Details</h2>
        </div>
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
          <div className="w-full flex items-start mb-5">
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
            {item.isReviewed || item.status === "Delivered" ? null : (
              <div
                onClick={() => setOpen(true) || setSelectedItem(item)}
                className={`${styles.button} text-[#fff]`}
              >
                Write a Review
              </div>
            )}
          </div>
        ))}

      {/* review Open */}

      {open && (
        <div className="w-full fixed left-0 top-0 h-screen flex items-center justify-center z-50 bg-[#0005] p-3">
          <div className=" shadow rounded-md bg-[#fff] w-[50%] h-min p-3">
            <div className="flex w-full justify-end p-1">
              <RxCross1
                onClick={() => setOpen(false)}
                className=" cursor-pointer"
                size={25}
              />
            </div>
            <h2 className="text-center font-[500] text-[30px] ">
              Give a Review
            </h2>
            <br />
            <div className="w-full flex  ">
              <img
                src={`${backned_Url}/uploads/${slectedItem?.images[0]}`}
                className="w-[80px] h-[70px] rounded object-cover"
                alt=""
              />
              <div>
                <h4 className="pl-3 text-[20px]">{slectedItem?.name}</h4>
                <h4 className="pl-3 text-[20px]">
                  US$ {slectedItem?.discountPrice}*{slectedItem?.count}
                </h4>
              </div>
            </div>
            <br />
            {/* rating */}
            <h5 className="pl-3 font-[500px]  text-[20px]">
              Give a Rating <span className="text-red-400">*</span>
            </h5>
            <div className="flex w-full ml-2 pt-1">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>
            <br />
            <div className="w-full ml-3">
              <label className="block text-[20px] font-[500">
                Write a comment{" "}
                <span className="ml-2 text-[15px]  text-[#00000052]">
                  (optional)
                </span>
              </label>
              <textarea
                className="mt-2 w-[95%] p-2 outline-none border"
                name="comment"
                id=""
                cols="20"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was your  product? write your expression about it "
              ></textarea>
            </div>
            <div
              onClick={rating > 1 ? reviewHandler : null}
              className={`${styles.button} mb-2 text-white text-[20px] ml-3 `}
            >
              Submit
            </div>
          </div>
        </div>
      )}

      <div className="border-t w-full text-right ">
        <h5 className="pl-3 text-[20px]">
          Total Price: <strong>US${data?.totalPrice}</strong>
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
        <div className="w-full md:border-none border-t   mt-3 md:w-[40%]">
          <h4 className="pt-2 text-[20px] font-600">Payment Info :</h4>
          <h4 className="pt-2 text-[20px] font-600">
            Status :{" "}
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
          </h4>
          {data?.status === "Delivered" && (
            <div
              onClick={refundHandler}
              className={`${styles.button} text-white`}
            >
              Give a Refund
            </div>
          )}
        </div>
      </div>
      <br />
      <Link>
        <div className={`${styles.button} text-white`}>Send Message</div>
      </Link>

      <br />
      <br />
    </div>
  );
};

export default UserOrderDetail;
