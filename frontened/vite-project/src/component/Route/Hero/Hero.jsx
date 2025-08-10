import React from 'react';
import styles from '../../../style/style';
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div 
      style={{
        backgroundImage: "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
      className={`w-full bg-no-repeat ${styles.noramlFlex} relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] 800px:min-h-[80vh]`}
    >
      <div className={`${styles.section} px-4 sm:px-6 md:px-8 w-full md:w-[90%] 800px:w-[60%]`}>
        <h1 className='text-[28px] sm:text-[32px] md:text-[40px] 800px:text-[60px] leading-tight md:leading-1.2 capitalize text-[#242020] font-bold text-center md:text-left'>
          Best collection for <br /> home decoration
        </h1>
        <p className='font-normal pt-3 md:pt-5 text-[14px] sm:text-[15px] md:text-[16px] text-[#000000ba] text-center md:text-left'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Qui natus <br className="hidden sm:block" /> ipsum perferendis ducimus accusantium laborum,
          earum placeat adipisci unde!<br className="hidden sm:block" /> Quos, eius. Deleniti nulla natus nesciunt et magni, pariatur ipsam quos.
        </p>
        <Link to={"/products"} className="flex justify-center md:justify-start">
          <div className={`${styles.button} mt-3 sm:mt-4 md:mt-5`}>
            <span className='text-white font-normal text-[16px] sm:text-[17px] md:text-[18px]'>
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Hero;