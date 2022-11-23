import { makeAutoObservable, runInAction } from "mobx";

import agent from "../api/agent";
import { store } from "./root.store";

import { User, UserFormValues } from "../../models/User.model";

import { history } from "../../index";
import { ROUTES } from "../../utils/contants.utils";

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
            history.push(ROUTES.ACTIVITIES.LIST);

            store.modalStore.closeModal();
        }
        catch (error) {
            throw error;
        }
    }

    public logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem(store.commonStore.localStorageTokenKey);

        this.user = null;
        history.push('/');
    }

    public getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        }
        catch (error) {
            console.log(error);
        }
    }

}