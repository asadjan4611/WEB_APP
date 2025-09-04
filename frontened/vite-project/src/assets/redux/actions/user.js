import axios from "axios";
import { backned_Url } from "../../../serverRoute";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });

    const res = await axios.get("http://localhost:8000/api/user/getUser", {
      withCredentials: true,
    });
    // console.log(res)
    dispatch({
      type: "loadUserSucessfully",
      payload: res.data.user,
    });
  } catch (error) {
    dispatch({
      type: "loadUserFailure",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const loadSeller = async (dispatch) => {
  // console.log("Welcome at load user function")
  try {
    dispatch({
      type: "loadSellerRequest",
    });
    // console.log("Welcome at load user function before api")

    const res = await axios.get(`http://localhost:8000/api/shop/getSeller`, {
      withCredentials: true,
    });
    // console.log("res is ",res.data.user)
    dispatch({
      type: "loadSellerSucessfully",
      payload: res.data.seller,
    });
  } catch (error) {
    dispatch({
      type: "loadSellerFailure",
      payload: error.data?.response.message,
    });
  }
};

export const updateUserInfo =
  (email, name, password, phoneNumber) => async (dispatch) => {
    // console.log("welocome at dispatch")
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });
      //  console.log(email,password,name,phoneNumber)
      const { data } = await axios.put(
        `${backned_Url}/api/user/updateUserInfo`,
        {
          name,
          email,
          password,
          phoneNumber,
        },
        {
          withCredentials: true,
        }
      );

      dispatch({
        types: "updateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserInfoFailure",
        payload: error.response?.data?.message,
      });
    }
  };

export const updateUserAddress =
  (country, city, address1, address2, zipCode, addressType) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "updateUserAddressRequest",
      });
   console.log(country, city, address1, address2, zipCode, addressType);
      const res = await axios.put(
        `${backned_Url}/api/user/userAddressUpadte`,
        {
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        },{
          withCredentials:true
        }
      );

      dispatch({
        type: "updateUserAddressSuccess",
        payload: res.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserAddressFailure",
        payload: error.response?.data?.message,
      });
    }
  };
