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
import { Building2, ShoppingBag, LifeBuoy } from "lucide-react"; // new icons

const Footer = () => {
  return (
    <div className="bg-[#000] text-white">
      {/* Newsletter Section */}
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#342ac8] py-7">
        <h1 className="lg:text-4xl text-3xl md:mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-[#56d879] mr-2">Subscribe</span>
          to get news <br /> events & offers
        </h1>

        <div>
          <input
            type="email"
            required
            className="text-gray-800 bg-white sm:mr-5 mr-1 lg:mb-4 py-2.5 rounded px-3 focus:outline-none w-[70%] md:w-auto"
            placeholder="Enter your email"
          />
          <button className="bg-[#56d879] hover:bg-teal-600 duration-300 px-5 py-2.5 rounded-md text-white mt-3 md:mt-0 md:w-auto w-full">
            Submit
          </button>
        </div>
      </div>

      {/* Links Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 sm:px-8 px-5 py-16 sm:text-center">
        {/* Logo + Socials */}
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt="logo"
            className="filter brightness-0 invert mb-4"
          />
          <p className="text-gray-400">
            The home and elements needed to create beautiful products.
          </p>
          <div className="flex items-center mt-5 gap-4">
            {[AiFillFacebook, AiOutlineTwitter, AiFillYoutube, AiFillGithub].map(
              (Icon, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-[#56d879] transition cursor-pointer"
                >
                  <Icon size={22} />
                </div>
              )
            )}
          </div>
        </ul>

        {/* Company Links */}
        <ul className="text-center sm:text-start">
          <h1 className="mb-2 font-semibold flex items-center gap-2 justify-center sm:justify-start">
            <Building2 size={18} /> Company
          </h1>
          {footerProductLinks.map((link) => (
            <li key={link.name}>
              <Link
                className="leading-6 cursor-pointer text-sm duration-300 hover:text-teal-400 text-gray-400"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Shop Links */}
        <ul className="text-center sm:text-start">
          <h1 className="mb-2 font-semibold flex items-center gap-2 justify-center sm:justify-start">
            <ShoppingBag size={18} /> Shop
          </h1>
          {footercompanyLinks.map((link) => (
            <li key={link.name}>
              <Link
                className="leading-6 cursor-pointer text-sm duration-300 hover:text-teal-400 text-gray-400"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Support Links */}
        <ul className="text-center sm:text-start">
          <h1 className="mb-2 font-semibold flex items-center gap-2 justify-center sm:justify-start">
            <LifeBuoy size={18} /> Support
          </h1>
          {footerSupportLinks.map((link) => (
            <li key={link.name}>
              <Link
                className="leading-6 cursor-pointer text-sm duration-300 hover:text-teal-400 text-gray-400"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center pt-5 text-gray-500 text-sm pb-6">
        <span>© 2023 Becodemy. All rights reserved.</span>
        <span className="sm:mx-auto">Terms • Privacy Policy</span>
        <div className="sm:block flex items-center justify-center w-full">
          <img
            className="mt-2"
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt="payment methods"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
