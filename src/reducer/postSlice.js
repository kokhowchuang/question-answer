import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    accessToken: "",
    list: [],
    totalPost: 0,
  },
  reducers: {
    add: (state, action) => {
      state.list.unshift(action.payload);
    },
    fetch: (state, action) => {
      state.list = [...action.payload.posts];
    },
    saveAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    saveComment: (state, action) => {
      const index = state.list.findIndex((object) => {
        return object._id === action.payload.productId;
      });
      state.list[index].comment.push(action.payload);
    },
    throwError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { add, fetch, saveAccessToken, saveComment, throwError } =
  postSlice.actions;

export const selectPostList = (state) => state.post.list;
export const selectTotalPost = (state) => state.post.totalPost;
export const selectAccessToken = (state) => state.post.accessToken;

export default postSlice.reducer;
