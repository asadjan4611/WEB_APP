import React from "react";
import styles from "../../../style/style";
import { Link } from "react-router-dom";
import backgroundImage from "../../../assets/backgroundImage.jpg";

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={`w-full relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] 800px:min-h-[90vh] flex items-center`}
    >
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div
        className={`${styles.section} relative z-10 px-4 sm:px-6 md:px-8 w-full md:w-[90%] 800px:w-[65%]`}
      >
        {/* Hero Heading */}
        <h1 className="text-[28px] sm:text-[36px] md:text-[64px] font-extrabold leading-tight text-center md:text-left text-white">
          Elevate Your <span className="text-pink-400">Home</span> <br /> With
          Timeless <span className="text-blue-400">Decor</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-4 sm:mt-5 md:mt-6 text-[14px] sm:text-[16px] md:text-[18px] text-gray-200 font-light text-center md:text-left max-w-2xl">
          Discover unique furniture, elegant lighting, and modern accessories to
          transform your space. <br className="hidden sm:block" /> Quality meets
          style in every piece — designed for your dream home.
        </p>

        {/* CTA Button */}
        <Link to={"/products"} className="flex justify-center md:justify-start">
          <div className="mt-5 sm:mt-6 md:mt-8 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-medium px-6 sm:px-8 md:px-10 py-3 rounded-full shadow-lg transition transform hover:scale-105">
            Shop Now
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
