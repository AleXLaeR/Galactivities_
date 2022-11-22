import {makeAutoObservable} from "mobx";

export default class CommonStore {
    jwtToken: string | null = null;
    appLoaded = false;
    localStorageTokenKey = 'jwt';

    public constructor() {
        makeAutoObservable(this);
    }

    public setToken = (token: string | null) => {
        console.log(token);
        if (token) {
            window.localStorage.setItem(this.localStorageTokenKey, token);
        }
        this.jwtToken = token;
    }

    public setAppLoading = () => {
        this.appLoaded = true;
    }
}