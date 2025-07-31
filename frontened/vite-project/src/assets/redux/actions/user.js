import axios from "axios";

export const loadUser = async(dispatch)=>{
  // console.log("Welcome at load user function")
  try {
    dispatch({
        type:"loadUserRequest"
    });
  // console.log("Welcome at load user function before api")

    const data = await axios.get(`http://localhost:8000/api/user/getUser`,{withCredentials:true});
    // console.log(data)
  // console.log("Welcome at load user function after api")

     dispatch({
        type:"loadUserSucessfully",
        payload:data.user
    });

  } catch (error) {
dispatch({
        type:"loadUserFailure",
        payload:error.data?.response.message
    });
  }
}