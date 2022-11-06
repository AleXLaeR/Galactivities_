import {ActivitiesAction} from "./activities.action";
import {ACTIVITIES_ACTION_TYPES} from "./activities.types";

const INITIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null,
}

export const categoriesReducer = (state = INITIAL_STATE, action = {} as ActivitiesAction) => {
    switch (action.type) {
        case ACTIVITIES_ACTION_TYPES.FETCH_ACTIVITIES_START:
            return {
                ...state,
                isLoading: true,
            };
        case ACTIVITIES_ACTION_TYPES.FETCH_ACTIVITIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categories: action.payload,
            };
        case ACTIVITIES_ACTION_TYPES.FETCH_ACTIVITIES_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}