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
  ProductDetailPage,
  ProfilePage,
  CheckOutPage,
  SellerActivationPage,
  ShopCreate
} from "./Routes";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import { loadUser } from "./assets/redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
function App() {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    // const noRoutes=["/login","sign-up"];
    // if(noRoutes.includes(location.pathname)) return ;
    loadUser(dispatch);
  }, [location.pathname]);

  return (
    <>
      {loading ? null : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route
            path="/activation/:activation_token"
            element={<ActivationPage />}
          />
          <Route
            path="/activation/seller/:activation_token"
            element={<SellerActivationPage />}
          />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:name" element={<ProductDetailPage />} />

          <Route path="/best-selling" element={<BestSelling />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

           <Route
            path="/checkout"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CheckOutPage />
              </ProtectedRoute>
            }
          />
            <Route path="/homepage" element={<HomePage />} />
          <Route path="/shop-create" element={<ShopCreate />} />

        </Routes>
      )}
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
