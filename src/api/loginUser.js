import axios from "axios";
import { saveAccessToken } from "../reducer/postSlice";

const { REACT_APP_API_URL } = process.env;

export const loginUser = (data) => async (dispatch) => {
  try {
    const param = {
      email: "investingnote@example.com",
      password: "111111",
    };

    const resp = await axios.post(`${REACT_APP_API_URL}/auth/login`, param);

    if (resp.status === 200) {
      alert("Successfully logged on.");
      dispatch(saveAccessToken(resp.data.accessToken));
    }
  } catch (error) {
    // Dispatch error handling function here
  }
};
