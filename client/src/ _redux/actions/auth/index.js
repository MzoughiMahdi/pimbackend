import { GET_ERRORS, SET_CURRENT_USER } from " _redux/types";
import jwt_decode from "jwt-decode";
import setAuthToken from "Utils/setAuthToken";
import { clientApi } from "api";

// Register User
export const signUp = (userData, history) => (dispatch) => {
  clientApi
    .post("/api/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//login
export const login = (userData) => (dispatch) => {
  console.log(userData);
  clientApi
    .post("/api/users/login", userData)
    .then((res) => {
      //save to local storage
      const { token } = res.data;
      //set token to local storage
      localStorage.setItem("jwtToken", token);

      //set token to auth header
      setAuthToken(token);
      // decode token to get user data
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//set logged in user

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//log out

export const logoutUser = () => (dispatch) => {
  //remove token form local store
  localStorage.removeItem("jwtToken");
  //remove auth header for future requests
  setAuthToken(false);
  //set the current user to an empty object with will also set isauth to false
  dispatch(setCurrentUser({}));
};
