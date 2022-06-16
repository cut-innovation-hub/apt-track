import {
  SET_TRAVEL_TIME_FAIL,
  SET_TRAVEL_TIME_REQUEST,
  SET_TRAVEL_TIME_SUCCESS,
} from "../constants/travelTime";

// set initial origin of app
export const set_travel_time_Reducer = (
  state = { travel_time_loading: false, origin: null },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case SET_TRAVEL_TIME_REQUEST:
      return { travel_time_loading: true };
    case SET_TRAVEL_TIME_SUCCESS:
      return { travel_time_loading: false, origin: action.payload };
    case SET_TRAVEL_TIME_FAIL:
      return { travel_time_loading: false, error: action.payload };
    default:
      return state;
  }
};
