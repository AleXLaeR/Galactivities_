import { makeAutoObservable, runInAction } from "mobx";

import { Activity } from "../../models/Activity.model";
import agent from "../api/agent";

import { format } from "date-fns";

import { store } from "./root.store";

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    isEditMode: boolean = false;
    isSubmitMode: boolean = false;
    isLoadingInitial: boolean = false;

    private currentLength: number = 0;

    public constructor() {
        makeAutoObservable(this);
    }

    public fetchActivities = async () => {
        if (this.currentLength === 0 ||
            this.activityRegistry.size !== this.currentLength) {
            this.setLoadingInitial(true);
        }
        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach(this.addActivity);
                this.currentLength = activities.length;
            });
        }
        catch (error: any) {
            console.log(error);
        }
        this.setLoadingInitial(false);
    }

    public fetchActivity = async (id: string) => {
        let activity = this.activityRegistry.get(id);

        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.setLoadingInitial(true);
            try {
                const fetchedActivity = await agent.Activities.details(id);
                runInAction(() => {
                    this.addActivity(fetchedActivity);
                    this.selectedActivity = fetchedActivity;
                });
            }
            catch (error: any) {
                console.log(error);
            }
            finally {
                this.setLoadingInitial(false);
            }
            return activity;
        }
    }

    private addActivity = (activity: Activity) => {
        const user = store.userStore.user!;

        activity.isGoing = activity.attendees!.some(
            a => a.username === user.username
        );
        activity.isHost = activity.hostUsername === user.username;
        activity.host = activity.attendees!.find(
            a => a.username === activity.hostUsername
        );

        activity.date = new Date(activity.date);
        this.activityRegistry.set(activity.id, activity);
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            a.date.getTime() - b.date.getTime());
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = format(activity.date, 'dd MMM yyyy h:mm aa');
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as { [key: string]: Activity[] })
        )
    }

    private setLoadingInitial = (state: boolean) => {
        this.isLoadingInitial = state;
    }

    public setEditMode = (state: boolean) => {
        this.isEditMode = state;
    }

    public setSubmitMode = (state: boolean) => {
        this.isSubmitMode = state;
    }

    public createActivity = async (activity: Activity) => {
        await agent.Activities.create(activity);
        runInAction(() => {
            this.activityRegistry.set(activity.id, activity);
        });
    }

    public updateActivity = async (activity: Activity) => {
        await agent.Activities.update(activity);
        runInAction(() => {
            this.activityRegistry.delete(activity.id);
            this.activityRegistry.set(activity.id, activity);
        });
    }

    public deleteActivity = async (id: string) => {
        this.setSubmitMode(true);

        await agent.Activities.delete(id);

        runInAction(() => {
            this.activityRegistry.delete(id);
            this.setSubmitMode(false);
        });
    }

    public onEditClickAction = () => {
        this.setEditMode(!this.isEditMode);
    }
}