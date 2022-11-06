import {Action, ActionWithPayLoad, createAction} from "../../utils/reducer/reducer.utils";

import {Activity} from "../../models/activity";
import agent from "../../api/agent";
import {ACTIVITIES_ACTION_TYPES} from "./activities.types";
import {extractDateFromDateTimeIso} from "../../utils/formatter.utils";

export type FetchActivitiesStart = Action<ACTIVITIES_ACTION_TYPES.FETCH_ACTIVITIES_START>;
export type FetchActivitiesSuccess = ActionWithPayLoad<ACTIVITIES_ACTION_TYPES.FETCH_ACTIVITIES_SUCCESS, Activity[]>;
export type FetchActivitiesFailure = ActionWithPayLoad<ACTIVITIES_ACTION_TYPES.FETCH_ACTIVITIES_FAILURE, Error>;

export type ActivitiesAction = FetchActivitiesStart | FetchActivitiesSuccess | FetchActivitiesFailure;

const fetchActivitiesStart = () : FetchActivitiesStart =>
    createAction(ACTIVITIES_ACTION_TYPES.FETCH_ACTIVITIES_START);

const fetchActivitiesSuccess = (activities: Activity[]) : FetchActivitiesSuccess =>
    createAction(ACTIVITIES_ACTION_TYPES.FETCH_ACTIVITIES_SUCCESS, activities);

const fetchActivitiesFailure = (error: Error) : FetchActivitiesFailure =>
    createAction(ACTIVITIES_ACTION_TYPES.FETCH_ACTIVITIES_FAILURE, error);

export const fetchActivitiesStartAsync: () => (dispatch: Function) => Promise<void> = () => {
    return async (dispatch) => {
        dispatch(fetchActivitiesStart());
        try {
            const activities = await agent.Activities.list();
            activities.forEach(a => a.date = extractDateFromDateTimeIso(a.date));
            dispatch(fetchActivitiesSuccess(activities));
        } catch (error: any) {
            console.log(error);
            dispatch(fetchActivitiesFailure(error));
        }
    }
}

export const setActivities = (activities: Activity[]): FetchActivitiesSuccess =>
    fetchActivitiesSuccess(activities);
