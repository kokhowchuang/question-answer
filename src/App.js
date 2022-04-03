import "./App.css";
import "react-slidedown/lib/slidedown.css";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { SlideDown } from "react-slidedown";

import MultipleSelectChip from "./components/MultipleSelectChip";
import { createPost } from "./api/createPost";
import { loginUser } from "./api/loginUser";
import { getPost } from "./api/getPost";
import { addComment } from "./api/addComment";
import {
  selectPostList,
  selectTotalPost,
  selectAccessToken,
} from "./reducer/postSlice";

function App() {
  const dispatch = useDispatch();
  const rows = useSelector(selectPostList);
  const totalPost = useSelector(selectTotalPost);
  const isAuthenticated = useSelector(selectAccessToken);
  const [close, setClose] = useState(true);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("");
  const [comment, setComment] = useState("");
  const [commentBoxClose, setCommentBoxClose] = useState([]);

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  const handleOpen = () => {
    if (isAuthenticated) {
      setClose(!close);
      setTitle("");
      setBody("");
    } else {
      alert("Sorry, please login to create new post.");
    }
  };

  const handleCreatePost = () => {
    dispatch(createPost({ title, body, tag }));
    setClose(!close);
  };

  const autoLogin = () => {
    dispatch(loginUser());
  };

  const handleOpenComment = (index) => {
    if (isAuthenticated) {
      commentBoxClose[index] = !commentBoxClose[index];
      setCommentBoxClose([...commentBoxClose]);
    } else {
      alert("Sorry, please login to post comment.");
    }
  };

  const handleAddComment = (index) => {
    const data = {
      comment,
      postId: rows[index]._id,
    };
    dispatch(addComment(data));
    setComment("");
    commentBoxClose[index] = !commentBoxClose[index];
  };

  const handleSelectTag = (event) => {
    const {
      target: { value },
    } = event;

    setTag(value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="qna-header">
          <div className="title">The Questions and Answers</div>
          <div className="qna-header-wrapper">
            <button className="flat-button" onClick={autoLogin}>
              Login
            </button>
            <button className="flat-button" onClick={handleOpen}>
              Create Post
            </button>
          </div>
        </div>
        <SlideDown className={"my-dropdown-slidedown"} closed={close}>
          <div className="newpost-container">
            <div className="title">What's your question?</div>
            <div className="user-input">
              <span className="subheading">Title</span>
              <input
                type="text"
                value={title}
                onChange={(evt) => {
                  setTitle(evt.target.value);
                }}
              />
            </div>
            <div className="user-input">
              <span className="subheading">Content</span>
              <textarea
                type="text"
                placeholder="What do you want to ask?"
                value={body}
                onChange={(evt) => {
                  setBody(evt.target.value);
                }}
              ></textarea>
            </div>
            <div className="user-input">
              <span className="subheading">Tag</span>
              <MultipleSelectChip
                onChange={handleSelectTag}
              ></MultipleSelectChip>
            </div>
            <button className="flat-button" onClick={handleCreatePost}>
              Add Post
            </button>
          </div>
        </SlideDown>
      </header>
      <div className="App-body">
        <div className="qna-body">
          <div className="title">All Posts</div>
          <div className="user-review-list">
            {rows.map((value, index) => {
              return (
                <div key={"post" + index} className="post-wrapper">
                  <div className="post-title">{value.title}</div>
                  <div className="post-body">{value.body}</div>
                  <div>
                    {value.comment &&
                      value.comment.map((value, index) => {
                        return (
                          <div key={"comment" + index}>
                            <div>{value.userId} answered</div>
                            <div>{value.content}</div>
                          </div>
                        );
                      })}
                  </div>
                  <div className="comment-wrapper">
                    <button
                      className="flat-button"
                      onClick={() => {
                        handleOpenComment(index);
                      }}
                    >
                      Comment
                    </button>
                    <SlideDown
                      className={"my-dropdown-slidedown"}
                      closed={!commentBoxClose[index]}
                    >
                      <div className="newpost-container">
                        <div className="user-input">
                          <span className="subheading">New Comment</span>
                          <textarea
                            type="text"
                            placeholder="What do you want to ask?"
                            value={comment}
                            onChange={(evt) => {
                              setComment(evt.target.value);
                            }}
                          ></textarea>
                        </div>
                        <button
                          className="flat-button"
                          onClick={() => {
                            handleAddComment(index);
                          }}
                        >
                          Add Comment
                        </button>
                      </div>
                    </SlideDown>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
