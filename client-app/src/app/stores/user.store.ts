import {makeAutoObservable, runInAction} from "mobx";

import {User, UserFormValues} from "../../models/User.model";
import agent from "../api/agent";
import {store} from "./root.store";
import {redirectTo} from "../../utils/routing.utils";

export default class UserStore {
    user: User | null = null;

    public constructor() {
        makeAutoObservable(this);
    }

    public get isLoggedIn() {
        return !!this.user;
    }

    public login = async (credentials: UserFormValues) => {
        try {
            const user = await agent.Account.login(credentials);
            store.commonStore.setToken(user.token);

            runInAction((() => this.user = user));
            redirectTo('activities');
        }
        catch (error) {
            throw error;
        }
    }

    public logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem(store.commonStore.localStorageTokenKey);

        this.user = null;
        redirectTo('/');
    }
}