import { combineReducers } from "redux";

import {categoriesReducer} from "./activities/activities.reducer";
import {activityReducer} from "./activity/activity.reducer";
import {stateReducer} from "./state/state.reducer";

export const rootReducer = combineReducers({
    appState: stateReducer,
    categories: categoriesReducer,
    selectedCategory: activityReducer,
});
