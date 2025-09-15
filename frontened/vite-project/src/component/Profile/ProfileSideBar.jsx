import React from 'react'
import { RxPerson } from 'react-icons/rx';
import { useLocation, useNavigate } from 'react-router-dom'
import styles from '../../style/style';
import { toast } from 'react-toastify';
import  axios  from "axios";
import { MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb"; 
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from 'react-icons/hi';
import { AiOutlineCreditCard, AiOutlineLogout, AiOutlineMessage } from 'react-icons/ai';
import { backned_Url } from '../../serverRoute';

const ProfileSideBar = ({active,setActive}) => {
   const navigate = useNavigate();
   const location = useLocation();
   
   const logoutHandler=()=>{
      axios.get(`${backned_Url}/api/user/logout`,{
        withCredentials:true
     }).then((res)=>{
        toast.success(res.data.message);
        window.location.reload(true);
        naviagte("/login");
     }).catch((error)=>{
      toast.error(data.res.error.message)
     })
   }

  
  return (
    <div className='w-full bg-white rounded-[10px] p-4 pt-8 shadow-sm'>
      <div 
      onClick={()=>setActive(1)}
      className="flex utem-center cursor-pointer w-ful mb-8">
        <RxPerson size={20} color={active ===1 ? "red":""}/>
        <span className={`pl-3 ${active ===1 ? "text-red-500" :""}`}>
         Profile
        </span>
      </div>

       <div 
      onClick={()=>setActive(2)}
      className="flex utem-center cursor-pointer w-ful mb-8">
        <HiOutlineShoppingBag size={20} color={active ===2 ? "red":""}/>
        <span className={`pl-3 ${active ===2 ? "text-red-500" :""}`}>
         Orders
        </span>
      </div>

       <div 
      onClick={()=>setActive(3)}
      className="flex utem-center cursor-pointer w-ful mb-8">
        <HiOutlineReceiptRefund size={20} color={active ===3 ? "red":""}/>
        <span className={`pl-3 ${active ===3 ? "text-red-500" :""}`}>
         Refund
        </span>
      </div>

       <div 
      onClick={()=>setActive(4) || navigate("/inbox")}
      className="flex utem-center cursor-pointer w-ful mb-8">
        <AiOutlineMessage size={20} color={active ===4 ? "red":""}/>
        <span className={`pl-3 ${active ===4 ? "text-red-500" :""}`}>
         Inbox
        </span>
      </div>

         <div 
      onClick={()=>setActive(5)}
      className="flex utem-center cursor-pointer w-ful mb-8">
        <MdOutlineTrackChanges size={21} color={active ===5 ? "red":""}/>
        <span className={`pl-3 ${active ===5 ? "text-red-500" :""}`}>
         Track Order
        </span>
      </div>

             <div 
      onClick={()=>setActive(6)}
      className="flex utem-center cursor-pointer w-ful mb-8">
        <AiOutlineCreditCard size={21} color={active ===6 ? "red":""}/>
        <span className={`pl-3 ${active ===6 ? "text-red-500" :""}`}>
          Change Passowrd
        </span>
      </div>

           <div 
      onClick={()=>setActive(7)}
      className="flex utem-center cursor-pointer w-ful mb-8">
        <TbAddressBook size={21} color={active ===7 ? "red":""}/>
        <span className={`pl-3 ${active ===7 ? "text-red-500" :""}`}>
         Address
        </span>
      </div>

         <div 
      onClick={()=>logoutHandler()}
      className="flex utem-center cursor-pointer w-ful mb-8">
        <AiOutlineLogout size={21} color={active ===7 ? "red":""}/>
        <span className={`pl-3 ${active ===7 ? "text-red-500" :""}`}>
         Logout
        </span>
      </div>

    </div>
  )
}

export default ProfileSideBar
