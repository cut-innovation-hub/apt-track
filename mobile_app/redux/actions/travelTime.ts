import { SET_TRAVEL_TIME_REQUEST } from "../constants/travelTime";

export const set_travel_time_Action =
  (id: any) => (dispatch: (arg0: { type: any; payload: any }) => void) => {
    dispatch({
      type: SET_TRAVEL_TIME_REQUEST,
      payload: { id },
    });
  };
