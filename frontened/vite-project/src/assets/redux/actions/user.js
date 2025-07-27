import axios from "axios";

export const loadUser = async(dispatch)=>{
  try {
    dispatch({
        typeof:"loadUserRequest"
    });

    const data = await axios.post(`http://localhost:8000/api/user/getUser`,{withCredentials:true});
     dispatch({
        typeof:"loadUserSucessfully",
        payload:data.user
    });

  } catch (error) {
dispatch({
        typeof:"loadUserFailure",
        payload:error.data.response.message
    });
  }
}