import { SET_DESTINATION_REQUEST } from "../constants/destinationConstants";

export const set_destination_Action = (id:any) => (dispatch: (arg0: { type: any; payload: any }) => void) => {
    dispatch({
        type: SET_DESTINATION_REQUEST,
        payload: { id }
    })
}
