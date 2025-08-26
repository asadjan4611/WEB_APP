import { useEffect } from "react";
import Cookies from "js-cookie";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
  OrderSucessPage,
  PaymentPage
} from "./Routes";
import {
  ShopCreate,
  ShopLoginPage,
  ShopHomePage,
  DashboardScreen,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvent,
  ShopAllEvents,
  CouponCode
} from "./ShopRoutes.js";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import { loadSeller, loadUser } from "./assets/redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Store from "./assets/redux/store.js";
import ShopProtectedRoute from "./ShopProtectedRoute/ShopProtectedRoute.jsx";
import { getAllShopsEvennts } from "./assets/redux/actions/event.js";
import { getAllProductss } from "./assets/redux/actions/product.js";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // Skip auth routes where loading isn't needed
    // const noAuthRoutes = ["/login", "/sign-up", "/"];
    // if (noAuthRoutes.includes(location.pathname)) return;

    // Get tokens from cookies
    const token = Cookies.get("token");
    const sellerToken = Cookies.get("seller_token");
     Store.dispatch(getAllShopsEvennts());
     Store.dispatch(getAllProductss());

    if (token && !sellerToken) {
      loadUser(dispatch);
    } else if (sellerToken) {

      loadSeller(dispatch);
    }
  }, [location.pathname, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:name" element={<ProductDetailPage />} />
        <Route path="/order/success/:id" element={<OrderSucessPage />} />
        <Route path="/best-selling" element={<BestSelling />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
          <CheckOutPage />
            </ProtectedRoute>
          }
        />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />

        {/* Shop Routes */}
        <Route path="/shop-create" element={<ShopCreate />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        {/* <Route path="/dashboard" element={<DashboardScreen />} /> */} 
         <Route
          path="/activation/seller/:activation_token"
          element={<SellerActivationPage />}
        />
        <Route
          path="/seller/:id"
          element={
            <ShopProtectedRoute>
              <ShopHomePage />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ShopProtectedRoute>
              <DashboardScreen />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-product"
          element={
            <ShopProtectedRoute>
              <ShopCreateProduct />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/dashboard-products"
          element={
            <ShopProtectedRoute>
              <ShopAllProducts />
            </ShopProtectedRoute>
          }
        />

        <Route
          path="/dashboard-create-event"
          element={
            <ShopProtectedRoute>
              <ShopCreateEvent />
            </ShopProtectedRoute>
          }
        />

        <Route
          path="/dashboard-events"
          element={
            <ShopProtectedRoute>
              <ShopAllEvents />
            </ShopProtectedRoute>
          }
        />
         <Route
          path="/dashboard-coupans"
          element={
            <ShopProtectedRoute>
              <CouponCode />
            </ShopProtectedRoute>
          }
        />
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
    </>
  );
}

export default App;
