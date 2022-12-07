import { makeAutoObservable, runInAction } from "mobx";

import agent from "app/api/agent";
import { store } from "app/stores/root.store";

import { User, UserFormValues } from "../../models/users/User";

import { history } from "index";
import { ROUTES } from "app/common/contants";

export default class UserStore {
    user: User | null = null;

    public constructor() {
        makeAutoObservable(this);
    }

    public get isLoggedIn() {
        return !!this.user;
    }

    public register = async (credentials: UserFormValues) => {
        try {
            const user = await agent.Account.register(credentials);
            this.onLoginOrRegisterEvent(user);
        }
        catch (error) {
            throw error;
        }
    }

    private onLoginOrRegisterEvent = (user: User) => {
        store.commonStore.setToken(user.token);

        runInAction((() => this.user = user));
        history.push(ROUTES.ACTIVITIES.LIST);

        store.modalStore.closeModal();
    }

    // TODO fix unwanted redirection on login
    public login = async (credentials: UserFormValues) => {
        try {
            const user = await agent.Account.login(credentials);
            console.log(user)
            this.onLoginOrRegisterEvent(user);
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

    public setImage = (imageUri: string) => {
        if (this.user) {
            this.user.imageUri = imageUri;
        }
    }

    public setDisplayName = (displayName: string) => {
        if (this.user) {
            this.user.displayName = displayName;
        }
    }
}