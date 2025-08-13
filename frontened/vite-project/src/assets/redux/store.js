import {configureStore} from "@reduxjs/toolkit"
// import { thunk } from "redux-thunk";
import {userReducer  } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
const Store  = configureStore({
    reducer:{
      user:userReducer,
      seller:sellerReducer
    }
});

export default Store;