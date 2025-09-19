import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../style/style";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { backned_Url } from "../../serverRoute";
import Loader from "../layout/loader";
import { Link } from "react-router-dom";
const ShopInfo = ({ isOwner }) => {
  const shopeId = useParams();
  const id = shopeId.id;
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { products } = useSelector((state) => state.products);

  const totalReviewLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);
  const totalRating =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, preview) => sum + preview.rating, 0),
      0
    );

  const averageRating = totalRating / totalReviewLength || 0;
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${backned_Url}/api/shop/get-shop-info/${id}`,)
      .then((res) => {
        setData(res.data.sellerInfo);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err);
      });
  }, [id]);
  const logoutHander = async () => {
    try {
      const res = await axios
        .get(`${backned_Url}/api/shop/logout-seller`, {
          withCredentials: true,
        })
        .then((res) => {
          navigate("/shop-login");
          window.location.reload(false);
        });
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  return loading ? (
    <Loader />
  ) : (
    <>
      <div>
        <div className="w-full py-5">
          <div className="w-full flex items-center justify-center">
            <img
              // src={`${backned_Url}/uploads/${data.avatar.url}`}
              className="w-[150px] h-[150px] object-cover rounded-full"
              alt=""
            />
          </div>
          <h1 className="text-center py-2 text-[20px]">{data?.name}</h1>

          <p className="text-[16px]  text-[#000000a6] flex items-center">
            {data?.description}
          </p>
        </div>
        <div className="p-3">
          <h2 className="font-[500px] "> Address</h2>
          <h3 className="text-[#000000a6]">{data?.address}</h3>
        </div>
        <div className="p-3">
          <h2 className="font-[500px] "> Phone Number</h2>
          <h3 className="text-[#000000a6]">{data?.phoneNumber}</h3>
        </div>
        <div className="p-3">
          <h2 className="font-[500px] "> Total Products</h2>
          <h3 className="text-[#000000a6]">{products?.length}</h3>
        </div>
        <div className="p-3">
          <h2 className="font-[500px] ">Shop Rating</h2>
          <h3 className="text-[#000000a6]">
            ({averageRating}/{totalReviewLength})
          </h3>
        </div>
        <div className="p-3">
          <h2 className="font-[500px] "> Joined on</h2>
          <h3 className="text-[#000000a6]">
            {data?.createdAt ? data.createdAt.slice(0, 10) : ""}
          </h3>
        </div>

        {isOwner && (
          <div className="py-3 px-4">
            <Link to={"/setting"}>
              <div
                className={`${styles.button} !h-[42px] !w-full !rounded-[5px]`}
              >
                <span className="text-white">Edit Shop</span>
              </div>
            </Link>
            <div
              onClick={logoutHander}
              className={`${styles.button} cursor-pointer !h-[42px] !w-full !rounded-[5px]`}
            >
              <span className="text-white">Logout shop</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShopInfo;
