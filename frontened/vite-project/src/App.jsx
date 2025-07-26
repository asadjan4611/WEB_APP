import { useEffect, useState } from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { LoginPage,SignUpPage,ActivationPage  } from "./Routes";
import { ToastContainer, toast } from 'react-toastify';
import "./App.css"
import axios from 'axios';
function App() {
useEffect(()=>{
  const noAuthRoutes = ["/login", "/sign-up"];
    if (noAuthRoutes.includes(location.pathname)) return;
   axios.get(`http://localhost:8000/api/user/getUser`,{withCredentials:true}).then((res)=>{
     // console.log(res);
  }).catch((err)=>{
    toast.error(err.response.data.message)
  });
},[]);

  return (
  
   <BrowserRouter>
   <Routes>
    <Route path ='/login' element ={<LoginPage/>}/>
    <Route path ='/sign-up' element ={<SignUpPage/>}/>
    <Route path ='/activation/:activation_token' element ={<ActivationPage/>}/>
   </Routes>
   <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
// transition=Bounce
/>
   </BrowserRouter>
  )
}

export default App
