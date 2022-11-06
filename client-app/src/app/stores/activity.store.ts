import {makeAutoObservable, runInAction} from "mobx";
import {Activity} from "../../models/activity";
import agent from "../api/agent";
import {extractDateFromDateTimeIso} from "../../utils/formatter.utils";
import {generateNextGuid} from "../../utils/guid.utils";

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined;
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
            runInAction(() => {
                activities.forEach(a => {
                    a.date = extractDateFromDateTimeIso(a.date);
                    this.activityRegistry.set(a.id, a);
                });
            });
        }
        catch (error: any) {
            console.log(error);
        }
        finally {
            this.setLoadingInitial(false);
        }
    }

    public getActivitiesByDate = (): Activity[]  => {
        return Array.from(this.activityRegistry.values())
            .sort((l, r) => Date.parse(l.date) - Date.parse(r.date))
    }

    private setLoadingInitial = (state: boolean) => {
        this.isLoadingInitial = state;
    }

    public selectActivity = (id?: string) => {
        this.selectedActivity = id ? this.activityRegistry.get(id) : undefined;
        this.setEditMode(false);
    }

    public setEditMode = (state: boolean) => {
        this.isEditMode = state;
    }

    public setSubmitMode = (state: boolean) => {
        this.isSubmitMode = state;
    }

    public createActivity = async (activity: Activity) => {
        activity.id = generateNextGuid();
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

    public onActivitySelect = (id?: string) => {
        this.selectActivity(id);
        this.setEditMode(false);
    }
}