import {ActivityAction} from "./activity.action";
import {ACTIVITY_ACTION_TYPES} from "./activity.types";

const INITIAL_STATE = {
    category: null
}

export const activityReducer = (state = INITIAL_STATE, action = {} as ActivityAction) => {
    switch (action.type) {
        case ACTIVITY_ACTION_TYPES.SET_CURRENT_ACTIVITY:
            return {
                ...state,
                category: action.payload,
            }
        default:
            return state;
    }
}
