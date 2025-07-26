import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../folder/server";
import styles from "../style/style";
import { useNavigate } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [name, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newForm = new FormData();
    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("password", password);
    newForm.append("email", email);

    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };

    const res =await axios
      .post(`http://localhost:8000/api/user/create-user`, newForm, config);
      // console.log("Your response is ",res.data.message);
      toast.success(res.data.message)
      
    } catch (err) {
       console.log("Error during signup:", err.response.data.message);
       toast.error(err.response.data.message);
       setAvatar();
       setEmail("");
       setFullname("");
       setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex-col flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Register as a new user</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setFullname(e.target.value)}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={visible ? "text" : "password"}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {visible ? (
                <AiOutlineEye
                  className="absolute right-2 top-2.5 cursor-pointer"
                  size={20}
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-2 top-2.5 cursor-pointer"
                  size={20}
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
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
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
          >
            Signup
          </button>

          {/* Link to Login */}
          <div className={`${styles.noramlFlex} justify-center`}>
            <p className="text-sm text-gray-600">Already have an account?</p>
            <Link to="/login" className="ml-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
