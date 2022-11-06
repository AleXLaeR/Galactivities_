import { applyMiddleware, compose, createStore } from "redux";

import thunk from "redux-thunk";

import {rootReducer} from "./root.reducer";

const middlewares = [thunk];
const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, composedEnhancers);