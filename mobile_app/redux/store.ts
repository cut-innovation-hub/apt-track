import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { set_user_Reducer } from "./reducers/userReducer";
import { set_origin_Reducer } from "./reducers/originReducers";
import { set_destination_Reducer } from "./reducers/destinationReducers";
import { set_travel_time_Reducer } from "./reducers/traveTimeReducer";

const initialState = {
  // destination: null,
  // travelTimeInformation: null,
  user_info: {
    user: null,
  },
};

const reducer = combineReducers({
  user_info: set_user_Reducer,
  origin: set_origin_Reducer,
  destinatin: set_destination_Reducer,
  travel_time: set_travel_time_Reducer
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
