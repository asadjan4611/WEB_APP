import {configureStore} from "@reduxjs/toolkit"
// import { thunk } from "redux-thunk";
import {userReducer  } from "./reducers/user";
const Store  = configureStore({
    reducer:{
      user:userReducer
    }
});

export default Store;