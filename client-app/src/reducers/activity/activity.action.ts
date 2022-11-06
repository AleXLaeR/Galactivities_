import {ActionWithPayLoad, createAction} from "../../utils/reducer/reducer.utils";
import {Activity} from "../../models/activity";
import {ACTIVITY_ACTION_TYPES} from "./activity.types";

export type ActivityAction = ActionWithPayLoad<ACTIVITY_ACTION_TYPES.SET_CURRENT_ACTIVITY, Activity>;

export const setSelectedActivity = (activity?: Activity) =>
    createAction(ACTIVITY_ACTION_TYPES.SET_CURRENT_ACTIVITY, activity);

export const setSelectedActivityFromExisting = (id: string, activities: Activity[] = []) =>
    createAction(ACTIVITY_ACTION_TYPES.SET_CURRENT_ACTIVITY, activities.find(a => a.id === id));
