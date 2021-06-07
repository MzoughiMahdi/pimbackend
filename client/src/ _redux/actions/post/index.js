import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  GET_POST,
  CLEAR_ERRORS,
} from " _redux/types";
import { clientApi } from "api";

//add post

export const addPost = (postData) => (dispatch) => {
  dispatch(clearErrors());
  console.log(postData);
  clientApi
    .post("/api/posts/add", postData, {
      headers: { authorization: localStorage.getItem("jwtToken") }, // require auth
    })
    .then((res) => {
      dispatch({
        type: ADD_POST,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      })
    );
};
// Get Posts
export const getPosts = () => (dispatch) => {
  dispatch(setPostLoading());
  clientApi
    .get("/api/posts")
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POSTS,
        payload: null,
      })
    );
};

// delete posts

export const deletePost = (id) => (dispatch) => {
  clientApi
    .delete(`api/posts/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_POST,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
//add like
export const addLike = (id) => (dispatch) => {
  clientApi
    .post(`api/posts/like/${id}`)
    .then((res) => dispatch(getPosts()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//remove like like
export const removeLike = (id) => (dispatch) => {
  clientApi
    .post(`api/posts/unlike/${id}`)
    .then((res) => dispatch(getPosts()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Get Post
export const getPost = (id) => (dispatch) => {
  dispatch(setPostLoading());
  clientApi
    .get(`/api/posts/${id}`)
    .then((res) =>
      dispatch({
        type: GET_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POST,
        payload: null,
      })
    );
};

// add a comment
export const addComment = (postId, commentData) => (dispatch) => {
  dispatch(clearErrors());
  clientApi
    .post(`/api/posts/comment/${postId}`, commentData)
    .then((res) =>
      dispatch({
        type: GET_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// delete a comment
export const deleteComment = (postId, commentId) => (dispatch) => {
  clientApi
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then((res) =>
      dispatch({
        type: GET_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
// set loading state

export const setPostLoading = () => {
  return {
    type: POST_LOADING,
  };
};

// clear errors

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
