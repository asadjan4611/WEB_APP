import { useEffect, useState } from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { LoginPage,SignUpPage,ActivationPage,HomePage  } from "./Routes";
import { ToastContainer, toast } from 'react-toastify';
import "./App.css"
import axios from 'axios';
import store from './assets/redux/store';
// import {loadUser} from "./assets/redux/reducers/user"
import { useDispatch } from 'react-redux';
function App() {
  const dispatch = useDispatch();
useEffect(()=>{
  const noAuthRoutes = ["/login", "/sign-up"];
    if (noAuthRoutes.includes(location.pathname)) return;
    // dispatch(loadUser())
},[]);

  return (
  
   <BrowserRouter>
   <Routes>
    <Route path ='/login' element ={<LoginPage/>}/>
    <Route path ='/sign-up' element ={<SignUpPage/>}/>
    <Route path ='/activation/:activation_token' element ={<ActivationPage/>}/>
    <Route path ='/homePage' element ={<HomePage/>}/>
   
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
