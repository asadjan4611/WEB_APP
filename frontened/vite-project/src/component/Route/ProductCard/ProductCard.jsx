import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../style/style";
import ProductCardDetails   from "../productCardDetails/ProductCardDetails";
import {AiFillHeart, AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar} from 'react-icons/ai'
const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");
  // console.log("products-name is ",product_name);

  return (
    <>
      <div className="w-full h-[370px]  bg-amber-50  rounded-lg shadow:sm p-3 relative cursor-pointer">
        <div className="flex justify-end">
        <Link to={`/product/${product_name}`}>
          <img
            src={data.image_Url[0].url}
            className="object-contain w-full h-[170px]"
            alt="A man outside the shop"
/>
        </Link>

        <div>
          {
            click?(
              <AiFillHeart
              color={click?"red":"#333"}
              size={25}
              className="mt-3 ml-2 cursor-pointer"
              onClick={()=>setClick(!click)}
              title="Remove from wishList"
              />
            ):(
              <AiOutlineHeart
               color={click?"red":"#333"}
              size={25}
              className="mt-3 ml-3 cursor-pointer"
              onClick={()=>setClick(!click)}
              title="Add to wishList"
              />

            )
          }
          <AiOutlineEye
              size={25}
              className="mt-3 ml-3 cursor-pointer"
              onClick={()=>{
                // console.log("hi clicking is happening")
                setOpen(!open)}}
              title="Quick View"
              />

              <AiOutlineShoppingCart
              size={25}
              className="mt-3 ml-3 cursor-pointer"
              title="Add to Cart"
              />


              {
                open ? (<ProductCardDetails setOpen ={setOpen}  data ={data}/>):null
              }
        </div>
        </div>

        <Link to={"/"}>
          <h1 className={`${styles.shop_name}`}>{data.shop.name}</h1>
        </Link>
        <Link to={`/product/${product_name}`}>
          <h2 className="pb-5 font-[400]">
            {data.name.length > 40
              ? data.name.slice(0, 40) + "...."
              : data.name}
          </h2>
                    </Link>
          <div className="flex">
            <AiFillStar  size={20} color="#F6BA00"/>
            <AiFillStar size={20} color="#F6BA00"/>
            <AiFillStar size={20} color="#F6BA00"/>
            <AiFillStar  size={20} color="#F6BA00"/>
            <AiOutlineStar  size={20} color="#F6BA00"/>
            
          </div>
            <div className="mt-3 flex items-center justify-between">
               <div className="flex">
                  <h5 className={`${styles.productDiscountPrice}`}>
                    {
                      data.price === 0 ? data.price :data.discount_price
                    }$
                  </h5>
                  <h4 className={`${styles.price}`}>
                   {
                    data.price? data.price+"$":null
                   }
                  </h4>
               </div>
               <span className={`${styles.shop_name} text-[17px]`}>{data.total_sell} sold</span>
            </div>

       
      </div>
    </>
  );
};

export default ProductCard;
