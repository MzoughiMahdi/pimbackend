import { CLEAR_ERRORS, GET_ERRORS } from " _redux/types";

const initialState = {};
export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_ERRORS:
      return {};
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
