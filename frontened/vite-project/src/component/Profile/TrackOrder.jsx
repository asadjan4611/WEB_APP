import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserOrder } from "../../assets/redux/actions/order";

const TrackOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { userOrders } = useSelector((state) => state.order);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrder(user?._id));
  }, [dispatch]);

  const data = userOrders && userOrders.find((item) => item._id === id);
  return (
    <div>
      <>
        {data && data?.status === "Processing" ? (
          <div className="flex items-center justify-center w-full  h-[80vh] ">
            <h5 className="text-[20px]">Your order is processing in shop</h5>
          </div>
        ) : data?.status === "Transferred to delivery partner" ? (
          <div className="flex items-center justify-center w-full  h-[80vh] ">
            <h5 className="text-[20px]">
              Your order is on the way for delivery Partner
            </h5>
          </div>
        ) : data?.status === "Shipping" ? (
          <div className="flex items-center justify-center w-full  h-[80vh] ">
            <h5 className="text-[20px]">
              Your order is coming with delivery partner{" "}
            </h5>
          </div>
        ) : data?.status === "Received" ? (
          <div className="flex items-center justify-center w-full  h-[80vh] ">
            <h5 className="text-[20px]">
              Your order is on your City. our Delivery Partner man will deliever
              it
            </h5>
          </div>
        ) : data?.status === "On the way" ? (
          <div className="flex items-center justify-center w-full  h-[80vh] ">
            <h5 className="text-[20px]">
              Our delivery man is going to deliever your order
            </h5>
          </div>
        ) : data?.status === "Delivered" ? (
          <div className="flex items-center justify-center w-full  h-[80vh] ">
            <h5 className="text-[20px]">Your Product has been delivered</h5>
          </div>
        ) : data?.status === "Refund Processing" ? (
          <div className="flex items-center justify-center w-full  h-[80vh] ">
            <h5 className="text-[20px]">Your Product has  been going to refund out .please wait! Thanks You</h5>
          </div>
        ): data?.status === "Refund Success" ? (
          <div className="flex items-center justify-center w-full  h-[80vh] ">
            <h5 className="text-[20px]">Your Refund is sucessfull!</h5>
          </div>  
        ):null
        
        }
      </>
    </div>
  );
};

export default TrackOrder;
