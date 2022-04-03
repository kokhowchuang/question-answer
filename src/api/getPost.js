import axios from "axios";
import { fetch } from "../reducer/postSlice";

const { REACT_APP_API_URL } = process.env;

export const getPost = (data) => async (dispatch) => {
  try {
    const resp = await axios.get(
      `${REACT_APP_API_URL}/posts`
    );

    if (resp.status === 200) {
      dispatch(fetch(resp.data));
    }
  } catch (error) {
    // Dispatch error handling function here
  }
};
