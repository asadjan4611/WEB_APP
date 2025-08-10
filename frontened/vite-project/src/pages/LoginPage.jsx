import React, { useEffect } from "react";
import Login from "../component/Login.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/homepage");
    }
  }, []);
  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
