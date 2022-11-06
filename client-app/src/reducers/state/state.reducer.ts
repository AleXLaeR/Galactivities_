import {StateAction} from "./state.action";
import {STATE_ACTION_TYPES} from "./state.types";

const INITIAL_STATE = {
    isEditMode: false,
    isSubmitMode: false,
}

export const stateReducer = (state = INITIAL_STATE, action = {} as StateAction) => {
    switch (action.type) {
        case STATE_ACTION_TYPES.SET_EDIT_MODE:
            return {
                ...state,
                isEditMode: action.payload,
            }
        case STATE_ACTION_TYPES.SET_SUBMIT_MODE:
            return {
                ...state,
                isSubmitMode: action.payload,
            }
        default:
            return state;
    }
}
