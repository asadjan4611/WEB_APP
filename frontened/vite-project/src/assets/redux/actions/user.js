import axios from "axios";

export const loadUser = async (dispatch) => {
  // console.log("Welcome at load user function")
  try {
    dispatch({
      type: "loadUserRequest",
    });
    // console.log("Welcome at load user function before api")

    const res = await axios.get(`http://localhost:8000/api/user/getUser`, {
      withCredentials: true,
    });
    // console.log("res is ",res.data.user)
    dispatch({
      type: "loadUserSucessfully",
      payload: res.data.user,
    });
  } catch (error) {
    dispatch({
      type: "loadUserFailure",
      payload: error.data?.response.message,
    });
  }
};
