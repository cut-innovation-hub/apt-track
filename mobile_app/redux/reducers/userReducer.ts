import { CREATE_USER_REQUEST } from "../constants/userConstants";

export const set_user_Reducer = (state = {}, action: { type: any; payload: any }) => {
    switch (action.type) {
        case CREATE_USER_REQUEST:
            return { explore_loading: true }
        default:
            return state
    }
}