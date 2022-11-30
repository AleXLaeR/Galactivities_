import {makeAutoObservable, reaction, runInAction} from "mobx";

import {UserActivity, UserProfile} from "../../models/UserProfile.model";

import Agent from "../api/agent";
import {store} from "./root.store";
import agent from "../api/agent";
import {ProfileImage} from "../../models/Image.model";

export default class ProfileStore {
    profile: UserProfile | null = null;
    isLoading = false;
    isUploading = false;

    userActivities: UserActivity[] = [];
    loadingActivities = false;
    followings: UserProfile[] = [];
    loadingFollowings = false;
    activeTab = 0;

    public constructor() {
        makeAutoObservable(this);

        reaction(() => this.activeTab,
            activeTab => {
            if (activeTab === 3 || activeTab === 4) {
               this.fetchFollowings((activeTab === 3) ? 'followers' : 'followings');
            } else {
                this.followings = [];
            }
        });
    }

    public setActiveTab = (tabNum: number) => {
        this.activeTab = tabNum;
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

    public deleteImage = async (image: ProfileImage) => {
        this.isUploading = true;

        try {
            await agent.Profiles.deleteImage(image.id);

            runInAction(() => {
                if (this.profile && this.profile.images) {
                    this.profile.images = this.profile.images.filter(
                        i => i.id !== image.id
                    );
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

    public setMainImage = async (image: ProfileImage) => {
        this.isUploading = true;

        try {
            await agent.Profiles.setMain(image.id);

            store.userStore.setImage(image.uri);
            runInAction(() => {
                if (this.profile && this.profile.images) {
                    this.profile.images.find(i => i.isMain)!.isMain = false;
                    this.profile.images.find(i => i.id === image.id)!.isMain = true;

                    this.profile.imageUri = image.uri;
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

    public updateProfile = async (profile: Partial<UserProfile>) => {
        this.isLoading = true;

        try {
            await agent.Profiles.update(profile);

            runInAction(() => {
                const currentUserDisplayName = store.userStore.user?.displayName;

                if (profile.displayName && profile.displayName !== currentUserDisplayName) {
                    store.userStore.setDisplayName(profile.displayName);
                }

                console.log(this.profile);

                this.profile = {...this.profile, ...profile as UserProfile};
            });
        }
        catch (error) {
            console.log(error);
        }
        finally {
            runInAction(() => this.isLoading = false);
        }
    }

    public loadUserActivities = async (username: string, filter?: string) => {
        this.loadingActivities = true;

        try {
            const activities = await agent.Profiles.listActivities(
                username,
                filter ?? 'future'
            );

            runInAction(() => this.userActivities = activities);
        } catch (error) {
            console.log(error);
        }
        finally {
            runInAction(() => this.loadingActivities = false);
        }
    }

    public updateFollowing = async (username: string, isFollowingAfter: boolean) => {
        this.isUploading = true;

        try {
            await agent.Profiles.updateFollowing(username);
            store.activityStore.updateAttendeeFollowings(username);

            runInAction(() => {
               if (this.profile &&
                   this.profile.username !== store.userStore.user?.username &&
                   this.profile.username !== username) {
                   isFollowingAfter ? this.profile.followersCount++ : this.profile.followersCount--;
                   this.profile.isFollowing = !this.profile.isFollowing;
               }

               if (this.profile && this.profile.username === store.userStore.user?.username) {
                   isFollowingAfter ? this.profile.followingCount++ : this.profile.followingCount--;
               }

               this.followings.forEach(profile => {
                   if (profile.username === username) {
                       profile.isFollowing ? profile.followersCount-- : profile.followersCount++;
                       profile.isFollowing = !profile.isFollowing;
                   }
               });
            });
        } catch (error) {
            console.log(error);
        }
        finally {
            runInAction(() => this.isUploading = false);
        }
    }

    public fetchFollowings = async (followType: string) => {
        this.loadingFollowings = true;

        try {
            const followings = await agent.Profiles.listFollowings(
                this.profile!.username,
                followType
            );

            runInAction(() => this.followings = followings);
        } catch (error) {
            console.log(error);
        }
        finally {
            runInAction(() => this.loadingFollowings = false);
        }
    }
}