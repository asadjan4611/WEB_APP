import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../style/style';
import { backned_Url } from '../../serverRoute';

const DropDown = ({allproducts,setDropDown}) => {
    const navigation = useNavigate();
    const location = useLocation();
    console.log(allproducts)

    const handleSubmitt =(i)=>{
        navigation(`/products?category=${i.category}`);
        setDropDown(false);
        window.location.reload();
    }
  return (
    <div className='pb-4 w-[230px] bg-white absolute z-30 rounded-b-md shadow-sm'>
 {
    allproducts && allproducts.map((i,index)=>(
        <div
         className={`${styles.noramlFlex}`} 
         onClick={()=>handleSubmitt(i)}
         key={index}>
            <img src={`${backned_Url}/uploads/${i.images[0]}`}
            style={{
                width:"25px",
                height:"25px",
                objectFit:"contain",
                marginLeft:"10px",
                userSelect:"none"
            }}
            alt="" />
            <h3 className='m-3 cursor-pointer select-none'>{i.category}</h3>
         </div>
    ))
 }      
    </div>
  )
}

export default DropDown;
