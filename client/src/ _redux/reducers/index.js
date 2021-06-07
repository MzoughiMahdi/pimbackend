import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";
import { reducer as form } from "redux-form";

export default combineReducers({
  form,
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
});
