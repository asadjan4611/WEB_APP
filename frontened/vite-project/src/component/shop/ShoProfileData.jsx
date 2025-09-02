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

const ShopProfileData = ({ isOwner }) => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.events);
  // console.log(events)
  const id = useParams();
  useEffect(() => {
    dispatch(getAllProduct(seller._id));
    dispatch(getAllEvennts(seller._id));
  }, [dispatch]);
  // console.log(products)
  const [active, setActive] = useState(1);
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
          {products &&
            products.map((i, index) => (
              <ProductCard key={index} isShop={true} data={i} />
            ))}
        </div>
      )}

      {active === 2 && (
    
          events &&
            events.map((i, index) => (
              <Card key={index} isShop={true} data={i} />
            ))
      )}
    </div>
  );
};
export default ShopProfileData;
