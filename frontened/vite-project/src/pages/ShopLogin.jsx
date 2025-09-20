import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../style/style';
import { backned_Url } from '../serverRoute';

const ShopLogin = () => {

  const [email, setEmail] = useState('');
  const naviagte = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);


const handleSubmit=async(e)=>{
          e.preventDefault();
      await axios.post(
       `${backned_Url}/api/shop/shop-login`,{
        email,
        password
       },{
        withCredentials:true
       }
      ).then((res)=>{
        toast.success(res.data.message);
            naviagte("/dashboard");
        window.location.reload(true);
        // console.log(res.data.message)
      }).catch((err)=>{
        toast.error(err.response.data.message)
        //  console.log(err.response.data.message)
      });
}

       
   
  

  return (
    <div className='min-h-screen bg-gray-100 flex-col flex justify-between py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Login to your shop
        </h2>
      </div>

      <div className='mt-3 sm:mx-auto sm:w-full sm:max-w-md'>
        {/* Login Form */}
        <div className='bg-white py-8 px-4 shadow sm:px-10'>
          <form className='space-y-8' onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                Email Address
              </label>
              <div className='mt-1'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>
            </div>

            {/* Password Field */}
            <div className='mt-1 relative'>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <div className='mt-1'>
                <input
                  id='password'
                  name='password'
                  type={visible ? 'text' : 'password'}
                  autoComplete='current-password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>

              {/* Toggle password visibility */}
              {visible ? (
                <AiOutlineEye
                  className='absolute right-2 top-9 cursor-pointer'
                  size={25}
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className='absolute right-2 top-9 cursor-pointer'
                  size={25}
                  onClick={() => setVisible(true)}
                />
              )}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className={`${styles.noramlFlex} justify-between`}>
              <div className={`${styles.noramlFlex}`}>
                <input
                  id='remember-me'
                  name='remember-me'
                  type='checkbox'
                  className='h-4 w-4 text-blue-600 border-gray-300 rounded'
                />
                <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-700'>
                  Remember me
                </label>
              </div>

              <div className='text-sm'>
                <a href='#' className='text-blue-600 font-medium hover:text-blue-400'>
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent text-white bg-blue-500 rounded-md hover:bg-blue-700 transition'
              >
                Login
              </button>
            </div>

            {/* Signup Link */}
            <div className={`${styles.noramlFlex} w-full`}>
              <h1>Don't have an account?</h1>
              <Link to='/shop-create' className='text-blue-600 pl-2'>
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ShopLogin;
