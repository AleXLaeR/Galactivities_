import { makeAutoObservable, runInAction } from "mobx";

import agent from "app/api/agent";
import { store } from "app/stores/root.store";

import { User, UserFormValues } from "models/users/User";

import { router } from "app/router/Routes";
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

        runInAction(() => this.user = user);
        router.navigate(ROUTES.ACTIVITIES.LIST);

        store.modalStore.closeModal();
    }

    // TODO fix unwanted redirection on login
    public login = async (credentials: UserFormValues) => {
        try {

            const user = await agent.Account.login(credentials);
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
        router.navigate(ROUTES.BASE);
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