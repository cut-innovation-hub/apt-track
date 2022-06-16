import {
    SET_ORIGIN_FAIL,
  SET_ORIGIN_REQUEST,
  SET_ORIGIN_SUCCESS,
} from "../constants/originConstants";

// set initial origin of app
export const set_origin_Reducer = (
  state = { origin_loading: false, origin: null },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case SET_ORIGIN_REQUEST:
      return { origin_loading: true };
    case SET_ORIGIN_SUCCESS:
      return { origin_loading: false, origin: action.payload };
    case SET_ORIGIN_FAIL:
        return {origin_loading:false, error: action.payload}
    default:
      return state;
  }
};
