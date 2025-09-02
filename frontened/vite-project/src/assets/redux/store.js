import {configureStore} from "@reduxjs/toolkit"
// import { thunk } from "redux-thunk";
import {userReducer  } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/events";
import {cartReducer} from "./reducers/cart";
const Store  = configureStore({
    reducer:{
      user:userReducer,
      seller:sellerReducer,
      products:productReducer,
      events:eventReducer,
       cart:cartReducer
    }
});

export default Store;