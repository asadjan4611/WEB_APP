import React, { useEffect } from 'react'
import Signup from "../component/Signup.jsx";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function SignUpPage() {
  const {isAuthenticated} = useSelector(state=>state.user);
  const navigate = useNavigate();
  useEffect(()=>{
     if (isAuthenticated === true) {
      navigate("/homepage");
     }
  },[]);
  return (
    <div>
      <Signup/>
    </div>
  )
}

export default SignUpPage
