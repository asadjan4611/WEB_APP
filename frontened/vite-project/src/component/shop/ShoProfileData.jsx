import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productData } from "../../static/data";
import Card from "../Route/ProductCard/Card.jsx";
import styles from "../../style/style";
import { getAllProduct } from "../../assets/redux/actions/product.js";
import { getAllEvennts } from "../../assets/redux/actions/event.js";
import Cards from "../Route/Card/Cards.jsx";
import ProductCard from "../Route/ProductCard/ProductCard.jsx";
import Rating from "../product/Rating.jsx";
import { backned_Url } from "../../serverRoute.js";

const ShopProfileData = ({ isOwner }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.events);
  const id = useParams();
  useEffect(() => {
    dispatch(getAllProduct(id));
    dispatch(getAllEvennts(id));
  }, [dispatch]);
  // console.log("events",events)
  const [active, setActive] = useState(1);  const allReviews =
    products && products.map((product) => product.reviews).flat();
  return (
    <div className=" w-full">
      <div className="flex w-full item-center">
        {/* //shop products */}
        <div
          onClick={() => setActive(1)}
          className="flex items-center cursor-pointer"
        >
          <h5
            className={`${
              active === 1 ? "text-red-500" : "text-[#333]"
            } ml-2 mr-20 font-[600px] text-[20px]`}
          >
            Shop Products
          </h5>
        </div>

        {/* // running events */}

        <div
          onClick={() => setActive(2)}
          className="flex items-center cursor-pointer"
        >
          <h5
            className={`${
              active === 2 ? "text-red-500" : "text-[#333]"
            } mr-20 font-[600px] text-[20px]`}
          >
            Running Events
          </h5>
        </div>

        {/* // shop Reviews */}

        <div
          onClick={() => setActive(3)}
          className="flex items-center cursor-pointer"
        >
          <h5
            className={`${
              active === 3 ? "text-red-500" : "text-[#333]"
            } mr-20 font-[600px] text-[20px]`}
          >
            Shop Reviews
          </h5>
        </div>

        {isOwner && (
          <div>
            <Link to={"/dashboard"}>
              <div
                className={`${styles.button}  !w-[165px] ml-10 !rounded-[5px]`}
              >
                <span className="text-center text-white">Go To Dashboard</span>
              </div>
            </Link>
          </div>
        )}
      </div>
      <br />
      {active === 1 && (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0 ">
          {products.length !== 0 ?
            products.map((i, index) => (
              <ProductCard key={index} isShop={true} data={i} />
            )) : (
               <h5 className="w-full text-center py-5 text-[18px]">
              No Products have for this shop!
            </h5>
            )}
        </div>
      )}

      {active === 2 && (
    
          events.length !== 0 ?
            events.map((i, index) => (
              <Card key={index} isShop={true} data={i} />
            )) : (
               <h5 className="w-full text-center py-5 text-[18px]">
              No Event have for this shop!
            </h5>
            )
      )}

 {active === 3 && (
        <div className="w-full">
          {allReviews &&
            allReviews.map((item, index) => (
              <div className="w-full flex my-4">
                <img
                  src={`${backned_Url}/uploads/${item?.user?.avatar.url}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-2">
                  <div className="flex w-full items-center">
                    <h1 className="font-[600] pr-2">{item.user.name}</h1>
                    <Rating ratings={item?.rating} />
                  </div>
                  <p className="font-[400] text-[#000000a7]">{item?.comment}</p>
                  <p className="text-[#000000a7] text-[14px]">{"2days ago"}</p>
                </div>
              </div>
))}
          {allReviews && allReviews.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              No Reviews have for this shop!
            </h5>
          )}
        </div>
      )}
    </div>
  );
};
export default ShopProfileData;
