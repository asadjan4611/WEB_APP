import React from 'react'
import styles from '../../../style/style'
import { brandingData } from '../../../static/data'
import { categoriesData } from "..//../../static/data";
import { useNavigate } from 'react-router-dom';
const Categories = () => {
    const navigation = useNavigate();
  return (
    <>
    <div className={`${styles.section} sm:block`}>
        <div className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}>
            {
                brandingData && brandingData.map((i,index)=>(
                    <div className='flex items-start ' key={index}>
                        {i.icon}
                        <div className='px-3'>
                            <h3 className='font-bold text-sm md:text-base'>

                            {i.title}
                            </h3>
                            <p className='text-xs md:text:sm'>{i.Description}</p>
                            </div>
                    </div>
                ))
            }
        </div>
      
    </div>


    <div className={`${styles.section} bg-white shadow-sm rounded-lg mb-12`}
    
    id='categories'>
     <div className="grid grid-cols  gap-[15px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]" >
    {
        categoriesData && categoriesData.map((i,index)=>{
             const handleSubmitt =(i) =>{
                 navigation(`/product?categorie=${i.title}`);
             }
             return(
                <div 
                onClick={()=>handleSubmitt(i)}
                key={index} 
                className={`w-full h-[100px] items-center flex justify-items-center overflow-hidden cursor-pointer`}
                >
                 <h5 className='text-[18px] leading-1.3'>
                    {i.title}
                 </h5>
                 <img
                 className='w-[120px] object-cover'
            
                 src={i.image_Url} alt="" />
                </div>
             )
})
    }
     </div>
    </div>
    </>
  )
}

export default Categories
