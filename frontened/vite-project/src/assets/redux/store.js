import {configureStore} from "@reduxjs/toolkit"
// import { thunk } from "redux-thunk";
import {userReducer  } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/events";
const Store  = configureStore({
    reducer:{
      user:userReducer,
      seller:sellerReducer,
      products:productReducer,
      events:eventReducer
    }
});

export default Store;