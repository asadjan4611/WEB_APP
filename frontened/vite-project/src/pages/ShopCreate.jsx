import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../style/style";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";

const ShopCreate = () => {
  const naviagte = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [zipCode, setZipCode] = useState();
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState();
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleFileInputChange =(e)=>{
    const file = e.target.files[0];
    setAvatar(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newForm = new FormData();
    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("password", password);
    newForm.append("email", email);
    newForm.append("address",address);
    newForm.append("zipCode",zipCode);
    newForm.append("phoneNumber",phoneNumber);


    

    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };

    const res =await axios
      .post(`http://localhost:8000/api/shop/create-shop`, newForm, config);
      // console.log("Your response is ",res.data.message);
      toast.success(res.data.message);
      naviagte("/homepage");
      
    } catch (err) {
       console.log("Error during signup:", err.response.data.message);
       toast.error(err);
      //  setAvatar("");
      //  setEmail("");
      //  setName("");
      //  setPassword("");
      //  setAddress("");
      //  setZipCode("");
      //  setName("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex-col flex justify-between py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a seller
        </h2>
      </div>

      <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-[30rem]">
        {/* Login Form */}
        <div className="bg-white py-8 px-4 shadow sm:px-10">
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Shop Name */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Shop Name
              </label>
              <div className="mt-1">
                <input
                  id="shop-name"
                  name="shop-name"
                  type="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Shop Phone number */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Shop Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phonenumber"
                  name="phone-number"
                  type="number"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
             
{/* Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                 Address
              </label>
              <div className="mt-1">
                <input
                  id="address"
                  name="address"
                  type="address"
                  
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>


            {/* ZipCode */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                ZipCode
              </label>
              <div className="mt-1">
                <input
                  id="zipcode"
                  name="zipcode"
                  type="number"
        
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mt-1 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type={visible ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              {/* Toggle password visibility */}
              {visible ? (
                <AiOutlineEye
                  className="absolute right-2 top-9 cursor-pointer"
                  size={25}
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-2 top-9 cursor-pointer"
                  size={25}
                  onClick={() => setVisible(true)}
                />
              )}
            </div>

            {/* Avatar Upload */}
          <div className={`${styles.noramlFlex} justify-start`}>
            <label className="block text-sm font-medium text-gray-700" htmlFor="avatar">
             Picture
            </label>
            <div className="mt-2 flex items-center">
              <span className="inline-block w-10 h-10 rounded-full overflow-hidden">
                {avatar ? (
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt="avatar"
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <RxAvatar className="h-10 w-10 text-gray-400" />
                )}
              </span>
              <label
                htmlFor="file-input"
                className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 rounded-md shadow-sm cursor-pointer"
              >
                Upload
                <input
                  id="file-input"
                  type="file"
                  name="avatar"
                  accept=".jpg,.jpeg,.png"
                  className="sr-only"
                  onChange={handleFileInputChange}
                />
              </label>
            </div>
          </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-white bg-blue-500 rounded-md hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </div>

            {/* Signup Link */}
            <div className={`${styles.noramlFlex} w-full`}>
              <h1>Already have an account?</h1>
              <Link to="/shop-login" className="text-blue-600 pl-2">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
