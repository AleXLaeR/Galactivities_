import {ActionWithPayLoad, createAction} from "../../utils/reducer/reducer.utils";
import {STATE_ACTION_TYPES} from "./state.types";

export type StateAction = ActionWithPayLoad<STATE_ACTION_TYPES.SET_EDIT_MODE
    | STATE_ACTION_TYPES.SET_SUBMIT_MODE, boolean>;

export const setEditMode = (value: boolean) =>
    createAction(STATE_ACTION_TYPES.SET_EDIT_MODE, value);

export const setSubmitMode = (value: boolean) =>
    createAction(STATE_ACTION_TYPES.SET_SUBMIT_MODE, value);