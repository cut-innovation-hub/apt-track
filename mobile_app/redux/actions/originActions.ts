import { SET_ORIGIN_REQUEST } from "../constants/originConstants";

export const set_origin_Action = (id:any) => (dispatch: (arg0: { type: any; payload: any }) => void) => {
    dispatch({
        type: SET_ORIGIN_REQUEST,
        payload: { id }
    })
}
