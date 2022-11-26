import { makeAutoObservable, runInAction } from "mobx";

import { UserProfile } from "../../models/UserProfile.model";

import Agent from "../api/agent";

export default class ProfileStore {
    profile: UserProfile | null = null;
    isLoading = false;

    public constructor() {
        makeAutoObservable(this);
    }

    public fetchProfile = async (username: string) => {
        this.isLoading = true;

        try {
            const profile = await Agent.Profiles.get(username);
            runInAction(() => this.profile = profile);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            runInAction(() => this.isLoading = false);
        }
    }
}