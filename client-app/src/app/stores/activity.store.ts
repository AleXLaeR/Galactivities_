import { makeAutoObservable, runInAction } from "mobx";

import { Activity } from "../../models/Activity.model";
import agent from "../api/agent";

import { extractDateFromDateTimeIso } from "../../utils/formatter.utils";

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    isEditMode: boolean = false;
    isSubmitMode: boolean = false;
    isLoadingInitial: boolean = false;

    public constructor() {
        makeAutoObservable(this);
    }

    public fetchActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            runInAction(() => activities.forEach(this.addActivity));
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
        activity.date = extractDateFromDateTimeIso(activity.date);
        this.activityRegistry.set(activity.id, activity);
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = activity.date;
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