import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../style/style';

const DropDown = ({categoriesData,setDropDown}) => {
    const navigation = useNavigate();
    const location = useLocation();

    const handleSubmitt =(i)=>{
        navigation(`/products?category=${i.title}`);
        setDropDown(false);
        window.location.reload();
    }
  return (
    <div className='pb-4 w-[230px] bg-white absolute z-30 rounded-b-md shadow-sm'>
 {
    categoriesData && categoriesData.map((i,index)=>(
        <div
         className={`${styles.noramlFlex}`} 
         onClick={()=>handleSubmitt(i)}
         key={index}>
            <img src={i.image_Url}
            style={{
                width:"25px",
                height:"25px",
                objectFit:"contain",
                marginLeft:"10px",
                userSelect:"none"
            }}
            alt="" />
            <h3 className='m-3 cursor-pointer select-none'>{i.title}</h3>
         </div>
    ))
 }      
    </div>
  )
}

export default DropDown;
