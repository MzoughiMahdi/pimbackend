import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from " _redux/reducers";

const middlewares = [thunk];
const initialState = {};
const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancers = [applyMiddleware(...middlewares)];

export default createStore(
  reducers,
  initialState,
  composeEnhancers(...enhancers)
);
