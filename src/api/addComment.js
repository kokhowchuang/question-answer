import axios from "axios";
import { saveComment, selectAccessToken } from "../reducer/postSlice";

const { REACT_APP_API_URL } = process.env;

export const addComment = (data) => async (dispatch) => {
  try {
    const param = {
      userId: "6249b5b3e57ca80e71e918db",
      content: data.comment,
      productId: data.postId,
    };

    const header = {
      headers: {
        "content-type": "application/json",
        Authorization: `Basic ${selectAccessToken}`,
      },
    };

    const resp = await axios.post(
      `${REACT_APP_API_URL}/post/${data.postId}/comment`,
      param,
      header
    );

    if (resp.status === 200) {
      dispatch(saveComment(param));
    }
  } catch (error) {
    // Dispatch error handling function here
  }
};
