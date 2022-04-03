import axios from "axios";
import { add, selectAccessToken } from "../reducer/postSlice";

const { REACT_APP_API_URL } = process.env;

export const createPost = (data) => async (dispatch) => {
  try {
    const param = {
      title: data.title,
      body: data.body,
      tag: data.tag.split(" ").join("-").toLowerCase(),
      userId: "6249b5b3e57ca80e71e918db",
    };
    console.log(param);

    const header = {
      headers: {
        "content-type": "application/json",
        Authorization: `Basic ${selectAccessToken}`,
      },
    };

    const resp = await axios.post(`${REACT_APP_API_URL}/post/`, param, header);

    if (resp.status === 200) {
      dispatch(add(param));
    }
  } catch (error) {
    // Dispatch error handling function here
  }
};
