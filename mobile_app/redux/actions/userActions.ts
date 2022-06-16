import { CREATE_USER_REQUEST } from "../constants/userConstants"

export const edit_username_Action = (id:any) => (dispatch: (arg0: { type: any; payload: any }) => void) => {
    dispatch({
        type: CREATE_USER_REQUEST,
        payload: { id }
    })
}
