import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";
const Footer = () => {
  return (
    <div className={`bg-[#000] text-white`}>
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#342ac8] py-7">
        <h1 className="lg:text-4xl  text-3xl md:mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-[#56d879] mr-2">Subscribe</span>
          us for get news <br />
          events and offers
        </h1>

        <div>
          <input
            type="text"
            required
            className="text-gray-800 bg-amber-50 sm:mr-5 mr-1 lg:mb-4 py-2.5 rounded px-2 focus:outline-none"
            placeholder="Enter your email"
            id=""
          />
          <button className="bg-[#56d879] hover:bg-teal-700 duration-300 px-5 py-2.5 rounded-md text-white md:w-auto w-full">
            Sumbit
          </button>
        </div>
      </div>

      {/* second footer */}

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 sm:px-8  px-5 py-16 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            style={{
              filter: "brightness(0) invert(1)",
            }}
            alt=""
          />
          <br />
          <p>The home and elements needed to create beautiful products.</p>
          <div className="flex items-center mt-[15px]">
            <AiFillFacebook size={25} style={{ cursor: "pointer" }} />

            <AiOutlineTwitter
              size={25}
              style={{ cursor: "pointer", marginLeft: "15px" }}
            />

            <AiFillYoutube
              size={25}
              style={{ cursor: "pointer", marginLeft: "15px" }}
            />

            <AiFillGithub
              size={25}
              style={{ cursor: "pointer", marginLeft: "15px" }}
            />
          </div>
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold ">Company</h1>
          {footerProductLinks.map((link) => {
            return (
              <li key={link.name}>
                <Link
                  className="leading-5 cursor-pointer text-sm duration-300 hover:text-teal-400 text-gray-400"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold ">Shop</h1>
          {footercompanyLinks.map((link) => {
            return (
              <li key={link.name}>
                <Link
                  className="leading-5 cursor-pointer text-sm duration-300 hover:text-teal-400 text-gray-400"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold ">Support</h1>
          {footerSupportLinks.map((link) => {
            return (
              <li key={link.name}>
                <Link
                  className="leading-5 cursor-pointer text-sm duration-300 hover:text-teal-400 text-gray-400"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="grid grid-cols-1 sm:grid-col-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-6">
        <span> o 2023 Becodemy. All right reserved.</span>
        <span>Terms.Privacy Policy</span>
        <div className="sm:block flex items-center justify-center w-full">
          <img
            className="mt-3"
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
