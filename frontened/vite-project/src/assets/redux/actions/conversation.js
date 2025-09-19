
import axios from "axios";
import { backned_Url } from "../../../serverRoute";

export const conversationRequest = (user) => async (dispatch) => {
  try {
    dispatch({ type: "createConversationRequest" });

    const res =await axios
        .get(
          `${backned_Url}/api/conversation/get-all-conversation-user/${user._id}`,
          {
            withCredentials: true,
          }
        )
    // console.log(res)
    dispatch({
      type: "createConversationSuccess",
      payload: res.data.conversations,
    });
  } catch (error) {
    dispatch({
      type: "createConversationFailure",
      payload: error.response?.data?.message || error.message,
    });
  }
};