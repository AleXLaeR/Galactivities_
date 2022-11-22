import { createContext, useContext } from "react";

import ActivityStore from "./activity.store";
import UserStore from "./user.store";
import CommonStore from "./common.store";


interface Store {
    activityStore: ActivityStore,
    userStore: UserStore,
    commonStore: CommonStore,
}

export const store: Store = {
    activityStore: new ActivityStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),
}

export const StoreContext = createContext(store);

export const useMobXStore = () => useContext(StoreContext);