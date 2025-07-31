import {configureStore} from "@reduxjs/toolkit"
// import { thunk } from "redux-thunk";
import {userReducer  } from "./reducers/user";
const store  = configureStore({
    reducer:{
      user:userReducer
    }
});

export default store;