import {makeAutoObservable, reaction} from "mobx";

export default class CommonStore {
    localStorageTokenKey = 'jwt';

    jwtToken: string | null = window
        .localStorage
        .getItem(this.localStorageTokenKey);
    appLoaded = false;

    public constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.jwtToken,
                token => {
                if (token) {
                    window.localStorage.setItem(this.localStorageTokenKey, token);
                } else {
                    window.localStorage.removeItem(this.localStorageTokenKey);
                }
        });
    }

    public setToken = (token: string | null) => {
        this.jwtToken = token;
    }

    public setAppLoading = () => {
        this.appLoaded = true;
    }
}