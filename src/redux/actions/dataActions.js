import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  SET_ERRORS,
  UNLIKE_POST,
  DELETE_POST,
  CREATE_POST,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_POST,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from "../types";
import axios from "axios";

//Get All Posts
export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/posts")
    .then((res) => {
      dispatch({ type: SET_POSTS, payload: res.data });
    })
    .catch(() => {
      dispatch({
        type: SET_POSTS,
        payload: [],
      });
    });
};

export const getPost = (postId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/post/${postId}`)
    .then((res) => {
      dispatch({ type: SET_POST, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

//Create a post
export const createPost = (body) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/post", body)
    .then((res) => {
      dispatch({ type: CREATE_POST, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

//Like A Post
export const likePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/like`)
    .then((res) => {
      dispatch({ type: LIKE_POST, payload: res.data });
      dispatch(getPost(postId));
    })
    .catch((err) => {
      console.log(err);
    });
};

//Unlike A Post
export const unlikePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/unlike`)
    .then((res) => {
      dispatch({ type: UNLIKE_POST, payload: res.data });
      dispatch(getPost(postId));
    })
    .catch((err) => {
      console.log(err);
    });
};

//Submit Comment
export const submitComment = (postId, commentData) => (dispatch) => {
  axios
    .post(`/post/${postId}/comment`, commentData)
    .then((res) => {
      dispatch({ type: SUBMIT_COMMENT, payload: res.data });
      console.log(res.data);
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

//Delete a post
export const deletePost = (postId) => (dispatch) => {
  axios
    .delete(`/post/${postId}`)
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
    })
    .catch((err) => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({ type: SET_POSTS, payload: res.data.posts });
    })
    .catch(() => {
      dispatch({ type: SET_POSTS, payload: null });
      // console.log(err);
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
