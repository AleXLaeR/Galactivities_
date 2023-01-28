import { createContext, useContext } from "react";

import ActivityStore from "./activity.store";
import UserStore from "./user.store";
import CommonStore from "./common.store";
import ModalStore from "./modal.store";
import ProfileStore from "./profile.store";
import CommentStore from './comment.store';


interface Store {
    activityStore: ActivityStore,
    userStore: UserStore,
    commonStore: CommonStore,
    modalStore: ModalStore,
    profileStore: ProfileStore,
    commentStore: CommentStore,
}

export const store: Store = {
    activityStore: new ActivityStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore(),
    commentStore: new CommentStore(),
}

export const StoreContext = createContext(store);

export const useMobXStore = () => useContext(StoreContext);