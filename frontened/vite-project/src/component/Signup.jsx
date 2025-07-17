import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";

import styles from "../style/style";
import { Link } from "react-router-dom";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [fullname, setFullname] = useState("");
  const [passowrd, setPassword] = useState("");
  const [visible, setVisble] = useState(false);

  const handleSubmitt = () => {
    console.log("hhhh");
  };
  const handlefileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };
  return (
    <div
      className="min-h-screen  bg-gray-100 flex-col flex justify-between py-12
     sm:px-6 lg:px-8"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a new user{" "}
        </h2>
      </div>
      <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-md">
        {/* full name */}
        <div className="bg-white mt-3  py-3 px-4 shadow  sm:px-10">
          <form action="" className="space-y-8">
            <div>
              <label
                htmlFor="fullname"
                className="block text:sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  name="fullname"
                  autoComplete="fullname"
                  required
                  value={fullname}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text:sm "
                  onChange={(e) => setFullname(e.target.value)}
                  type="text"
                />
              </div>
            </div>
          </form>
        </div>

        {/* email field */}
        <div className="bg-white  py-3 px-4 shadow  sm:px-10">
          <form action="" className="space-y-8">
            <div>
              <label
                htmlFor="email"
                className="block text:sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text:sm "
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </div>
            </div>
          </form>
        </div>

        {/* password field */}

        <div className="bg-white  py-2 px-4 shadow  sm:px-10">
          <form action="" className="space-y-8">
            <div className="mt-1 relative">
              <label
                htmlFor="passowrd"
                className="block text:sm sm:rounded-lg font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  name="password"
                  type={visible ? "password" : "text"}
                  autoComplete="current-password"
                  required
                  value={passowrd}
                  className="appearance-none block w-full px-3 py-2  sm:rounded-lg border border-gray-300 rounded-md shadow-sm placeholder:gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text:sm "
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {visible ? (
                <AiOutlineEye
                  className="absolute right-2 top-9 cursor-pointer"
                  size={25}
                  onClick={() => setVisble(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-2 top-9 cursor-pointer"
                  size={25}
                  onClick={() => setVisble(true)}
                />
              )}
            </div>
            <div className={`${styles.noramlFlex} justify-start`}>
              {/* avatar */}
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="avatar"
              ></label>
              <div className="mt-2 flex items-center ">
                <span className="inline-block w-8 rounded-full overflow-hidden h-8">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full w-full  object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label   
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-med text-gray-400 bg-white hover:bg-gray-500 rounded-md shadow-sm "
                  htmlFor="file-input"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    className="sr-only"
                    onChange={handlefileInputChange}
                    accept=".jpg,.png,.jpeg"
                  />
                </label>
              </div>
            </div>

            {/* button */}
            <div className="bg-blue-500 rounded-md flex justify-center  border border-transparent py-2 px-4 w-full h-[40px] text-center text-white  hover:bg-blue-700 p-3">
              <button type="submit">Signup</button>
            </div>

            {/* sign-up option */}
            <div className={`${styles.noramlFlex} w-full`}>
              <h1>Already have an account?</h1>
              <Link to={"/login"} className="text-blue-600  pl-2">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
