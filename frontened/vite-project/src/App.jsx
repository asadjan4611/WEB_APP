import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import {
  LoginPage,
  SignUpPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSelling,
  EventPage,
  FAQPage,
} from "./Routes";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import { loadUser } from "./assets/redux/actions/user";
import { useDispatch } from "react-redux";
function App() {
  const { loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    const noAuthRoutes = ["/login", "/sign-up"];
    if (noAuthRoutes.includes(location.pathname)) return;
    loadUser(dispatch);
  }, [location.pathname]);

  return (
    <>
      {
        loading ? null :(
          <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/best-selling" element={<BestSelling />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
        )
      }
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
    </>
  );
}

export default App;
