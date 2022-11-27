import { makeAutoObservable, runInAction } from "mobx";

import { UserProfile } from "../../models/UserProfile.model";

import Agent from "../api/agent";
import {store} from "./root.store";
import agent from "../api/agent";

export default class ProfileStore {
    profile: UserProfile | null = null;
    isLoading = false;
    isUploading = false;

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

    public get isCurrentStoredUser() {
        if (store.userStore.user && this.profile) {
            return store.userStore.user.username === this.profile.username;
        }
        return false;
    }

    public uploadImage = async (file: Blob) => {
        this.isUploading = true;

        try {
            const image = await agent.Profiles.uploadImage(file);

            runInAction(() => {
                if (this.profile) {
                    this.profile.images.push(image);

                    if (image.isMain && store.userStore.user) {
                        store.userStore.setImage(image.uri);
                        this.profile.imageUri = image.uri
                    }
                }
            });
        }
        catch (error) {
            console.log(error);
        }
        finally {
            runInAction(() => this.isUploading = false);
        }
    }
}