import React, { useState } from 'react'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import styles from '../style/style';
import { Link } from "react-router-dom";
const Login = () => {
        const [email,setEmail] = useState('');
        const [passowrd,setPassword] = useState('');
        const [visible,setVisble] = useState(false);
  return (


    <div className='min-h-screen  bg-gray-100 flex-col flex justify-between py-12
     sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
           <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Login to your account</h2>
        </div>
      <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-md">
       
       {/* email field */}
        <div className='bg-white  py-8 px-4 shadow  sm:px-10'>
            <form action="" className='space-y-8'>
                <div>
                    <label htmlFor="email" className='block text:sm font-medium text-gray-700'>
                        Email Address
                    </label>
                    <div className='mt-1'>
                        <input
                        name='email'
                        autoComplete='email'
                        required value={email}
                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text:sm '
                        onChange={(e)=>setEmail(e.target.value)}
                        type="email" />
                    </div>
                </div>
            </form>
        </div>
           
{/* password field */}

         <div className='bg-white  py-3 px-4 shadow  sm:px-10'>
            <form action="" className='space-y-8'>
                <div className='mt-1 relative'>
                    <label htmlFor="passowrd" className='block text:sm sm:rounded-lg font-medium text-gray-700'>
                        Password
                    </label>
                    <div className='mt-1'>
                        <input
                        name='password'
                        type={visible ? "password":'text'} 
                        autoComplete='current-password'
                        required 
                        value={passowrd}
                        className='appearance-none block w-full px-3 py-2  sm:rounded-lg border border-gray-300 rounded-md shadow-sm placeholder:gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text:sm '
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                
                   {
                    visible ? (
                         <AiOutlineEye 
                    className='absolute right-2 top-9 cursor-pointer'
                    size={25}
                    onClick={()=>setVisble(false)}
                    />
                    ) : (
                         <AiOutlineEyeInvisible 
                    className='absolute right-2 top-9 cursor-pointer'
                    size={25}
                    onClick={()=>setVisble(true)}
                    />
                    )
                   }
                    
                </div>
               <div className={`${styles.noramlFlex} justify-between`}>
                {/* checkbox */}
                <div className={`${styles.noramlFlex}`}>
                    <div className={`${styles.noramlFlex}`}>
                        <input
                        id='remember-me'
                        name='remember-me'
                        className='h-4 w-4 text-blue-600 hover:text-blue-500 border-gray-300 rounded'
                        type="checkbox"
                        
                        />
                        <label htmlFor=""
                        className='bock text-sm text-blue-600 text-gray ml-2'
                        >
                            Rememeber me
                        </label>
                    </div>
                </div>

                {/* forget the password */}
                 
                 <div className='text-sm'>
                    <a href=""
                    className='text-blue-600 font-medium hover:text-blue-400'
                    >
                        Forgot your passowrd
                    </a>
                 </div>

                 
                 </div>

                 {/* button */}
                 <div className='bg-blue-500 rounded-md flex justify-center  border border-transparent py-2 px-4 w-full h-[40px] text-center text-white  hover:bg-blue-700 p-3'>
                    <button type='submit'>
                        Login
                    </button>
                 </div>

                 {/* sign-up option */}
                 <div className={`${styles.noramlFlex} w-full`}>
                    <h1>Not have any account?</h1>
                  <Link to ={'/sign-up'} className ="text-blue-600  pl-2">
                  Sign-Up
                  </Link>
                 </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login
