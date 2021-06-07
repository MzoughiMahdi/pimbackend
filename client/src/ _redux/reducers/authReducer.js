import { SET_CURRENT_USER } from " _redux/types";
import isEmpty from "helpers/isEmpty";

const initialState = {
  isLogged: false,
  user: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      console.log(action.payload);
      return {
        ...state,
        isLogged: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
}
