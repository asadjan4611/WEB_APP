import React from 'react'
import styles from '../../../style/style'
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div 
    style={
        {
            backgroundImage:"url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)"
            ,backgroundSize:"cover"
        }
    }
    className={`w-full bg-no-repeat ${styles.noramlFlex} relative min-h-[70vh] 800px:min-h[80vh]`}>

        <div className={`{styles.section}  px-58 w-[90%] 800px:w-[60%]`}>
            <h1 className='text-[40px] leading-1.2 capitalize  800px:text-[60px] text-[#242020] font-[700] flex items-center'>
              best collection for <br />home decoration
            </h1>
            <p className='font-[400] pt-5 text-[16px] text-[#000000ba]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                 Qui natus <br /> ipsum perferendis ducimus accusantium laborum,
                 earum  placeat
                  adipisci unde!<br /> Quos, eius. Deleniti nulla natus nesciunt et magni, pariatur ipsam quos.
            </p>
            <Link
            to={"/products"}
            >
              <div className={`${styles.button} mt-5`}>
                   <span className='text-white font-[400] text-[18px]'>
                      Shop Now
                   </span>
              </div>
            </Link>
        </div>
    
    </div>
  )
}

export default Hero
