import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../style/style";
import ProductCardDetails   from "../productCardDetails/ProductCardDetails";
import {AiFillHeart, AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar} from 'react-icons/ai'
import { backned_Url } from "../../../serverRoute";
import { useDispatch, useSelector } from "react-redux";
import {addToWishList, removeFromWishList} from "../../../assets/redux/actions/wishList"
import { addToCart } from "../../../assets/redux/actions/cart";
import { toast } from "react-toastify";
const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const d = data.name;
const {wishList}= useSelector((state)=>state.wishList);
// console.log(wishList)
  const product_name = d.replace(/\s+/g, "-");
  const dispatch = useDispatch();

  useEffect(()=>{
   if (wishList && wishList.find((i)=>
    i._id === data._id
   )) {
    setClick(true);
   }else{
    setClick(false);
   }
  },[wishList]);

   const addToWishListHandler =(data)=>{
    setClick(!click);
    dispatch(addToWishList(data));
  }

  const addToCartHandler = (data)=>{
    dispatch(addToCart(data));
    toast.success("Product  is add in Cart")
  }

  const removeFromWishListHandler =(data)=>{
  setClick(!click);
  dispatch(removeFromWishList(data));
  }
  return (
    <>
      <div className="w-full h-[370px]  bg-amber-50  rounded-lg shadow:sm p-3 relative cursor-pointer">
        <div className="flex justify-end">
        <Link to={`/product/${data._id}`}>
          <img
            src={`${backned_Url}/uploads/${data.images[0]}`} // changing for  best deals of homepage
            className="object-contain w-full h-[170px]"
            alt="loading error"
/>
        </Link>

        <div>
          {
            click?(
              <AiFillHeart
              color={click?"red":"#333"}
              size={25}
              className="mt-3 ml-3 cursor-pointer"
              onClick={()=>removeFromWishListHandler(data)}
              title="Remove from wishList"
              />
            ):(
              <AiOutlineHeart
              color={click?"red":"#333"}
              size={25}
              onClick={()=>addToWishListHandler(data)}
              className="mt-3 ml-3 cursor-pointer"
              title="Add to wishList"
              />

            )
          }
          <AiOutlineEye
              size={25}
              className="mt-3 ml-3 cursor-pointer"
              onClick={()=>{
                
                setOpen(!open)}}
              title="Quick View"
              />

              <AiOutlineShoppingCart
              size={25}
              onClick={()=>addToCartHandler(data)}
              className="mt-3 ml-3 cursor-pointer"
              title="Add to Cart"
              />


              {
                open ? (<ProductCardDetails setOpen ={setOpen}  data ={data}/>):null
              }
        </div>
        </div>

         <Link to={`/shop/preview/${data.shopeId}`}>
          <h1 className={`${styles.shop_name}`}>{data.shop.name}</h1>
        </Link>
        <Link to={`/product/${data._id}`}>
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
                      data.originalPrice === 0 ? data.originalPrice :data.discountPrice
                    }$
                  </h5>
                  <h4 className={`${styles.price}`}>
                   {
                    data.originalPrice? data.originalPrice+"$":null
                   }
                  </h4>
               </div>
               <span className={`${styles.shop_name} text-[17px]`}>{data.sold_out} sold</span>
            </div>

       
      </div>
    </>
  );
};

export default ProductCard;
