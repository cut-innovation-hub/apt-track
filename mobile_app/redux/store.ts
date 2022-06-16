import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { set_user_Reducer } from "./reducers/userReducer";
import { set_origin_Reducer } from "./reducers/originReducers";

const initialState = {
  origin: {
    origin_info: null,
  },
  // destination: null,
  // travelTimeInformation: null,
  user_info: {
    user: null,
  },
};

const reducer = combineReducers({
  user_info: set_user_Reducer,
  origin: set_origin_Reducer,
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
