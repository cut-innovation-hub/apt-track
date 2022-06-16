import { SET_DESTINATION_FAIL, SET_DESTINATION_REQUEST, SET_DESTINATION_SUCCESS } from "../constants/destinationConstants";

// set initial origin of app
export const set_destination_Reducer = (
  state = { destination_loading: false, destination: null },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case SET_DESTINATION_REQUEST:
      return { destination_loading: true };
    case SET_DESTINATION_SUCCESS:
      return { destination_loading: false, origin: action.payload };
    case SET_DESTINATION_FAIL:
        return {destination_loading:false, error: action.payload}
    default:
      return state;
  }
};
