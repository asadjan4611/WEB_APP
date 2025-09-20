import { useEffect, useState } from "react";
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
  PaymentPage,
  UserOrderDetailsPage,
  TrackOrderPage,
  UserInboxPage,
} from "./Routes";
import {
  ShopPreview,
  ShopCreate,
  ShopLoginPage,
  ShopHomePage,
  DashboardScreen,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvent,
  ShopAllEvents,
  CouponCode,
  ShopOrderPage,
  DashboardShopOrderPage,
  ShopAllRedunds,
  ShopSettingPage,
  ShopInboxPage,
  ShopWithDrawMoney
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
import axios from "axios";
import { backned_Url } from "./serverRoute.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { conversationRequest } from "./assets/redux/actions/conversation.js";
function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [stripeapikey, setstripeapikey] = useState("");
  const {user}=useSelector((state)=>state.user);
  useEffect(() => {
    async function getStripeKey() {
      const { data } = await axios.get(
        `${backned_Url}/api/stripe/stripeApiKey`
      );
      setstripeapikey(data.stripeApiKey);
    }
    // Skip auth routes where loading isn't needed
    // const noAuthRoutes = ["/login", "/sign-up", "/"];
    // if (noAuthRoutes.includes(location.pathname)) return;

    // Get tokens from cookies
    const token = Cookies.get("token");
    const sellerToken = Cookies.get("seller_token");
    Store.dispatch(getAllShopsEvennts());
    Store.dispatch(getAllProductss());
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(conversationRequest(user));
    getStripeKey();
  }, [dispatch]);

  return (
    <>
      {stripeapikey && (
        <Elements stripe={loadStripe(stripeapikey)}>
          <Routes>
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Elements>
      )}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />

        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/order/success/" element={<OrderSucessPage />} />
        <Route path="/best-selling" element={<BestSelling />} />
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
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <UserOrderDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage />
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

        <Route
          path="/user-inbox"
          element={
            <ProtectedRoute>
              <UserInboxPage />
            </ProtectedRoute>
          }
        />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />

        <Route path="/shop/preview/:id" element={<ShopPreview />} />

        {/* Shop Routes */}
        <Route path="/shop-create" element={<ShopCreate />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
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
          path="/order/:id"
          element={
            <ShopProtectedRoute>
              <ShopOrderPage />
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
          path="/dashboard-orders"
          element={
            <ShopProtectedRoute>
              <DashboardShopOrderPage />
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
          path="/dashboard-messages"
          element={
            <ShopProtectedRoute>
              <ShopInboxPage />
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

        <Route
          path="/dashboard-refunds"
          element={
            <ShopProtectedRoute>
              <ShopAllRedunds />
            </ShopProtectedRoute>
          }
        />

        <Route
          path="/dashboard-withdraw-money"
          element={
            <ShopProtectedRoute>
              <ShopWithDrawMoney />
            </ShopProtectedRoute>
          }
        />

        <Route
          path="/setting"
          element={
            <ShopProtectedRoute>
              <ShopSettingPage />
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
