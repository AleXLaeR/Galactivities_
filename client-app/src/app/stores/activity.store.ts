import {makeAutoObservable, reaction, runInAction} from "mobx";

import {Activity, ActivityFormValues} from "../../models/Activity.model";
import agent from "../api/agent";

import { format } from "date-fns";

import { store } from "./root.store";
import { UserProfile } from "../../models/UserProfile.model";
import { Pagination, PagingParams } from "../../models/pagination";

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;

    isEditMode = false;
    isSubmitMode = false;
    isLoadingInitial = false;

    pagination: Pagination | null = null;
    pagingParams = new PagingParams();

    filter = new Map().set('all', true);
    sorting = 'date';

    private currentLength: number = 0;

    public constructor() {
        makeAutoObservable(this);

        reaction(() => this.filter.keys(),
            () => {
                this.pagingParams = new PagingParams();
                this.activityRegistry.clear();
                this.fetchActivities().then();
            })
        ;
        reaction(() => this.sorting,
            () => {
                this.pagingParams = new PagingParams();
                this.activityRegistry.clear();
                this.fetchActivities().then();
            })
        ;
    }

    public setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    public setFilter = (filter: string, value?: any) => {
        const resetFilter = () => {
            this.filter.forEach((value, key) => {
                if (key !== 'startDate') this.filter.delete(key);
            })
        }

        switch (filter) {
            case 'all':
                resetFilter();
                this.filter.set('all', value);
                break;
            case 'isGoing':
                resetFilter();
                this.filter.set('isGoing', value);
                break;
            case 'isHosting':
                resetFilter();
                this.filter.set('isHosting', value);
                break;
            case 'startDate':
                this.filter.delete('startDate');
                this.filter.set('startDate', value);
                break;
        }
    }

    public setSorting = (sortBy: string) => {
        this.sorting = sortBy;
    }

    private get axiosParams() {
        const params = new URLSearchParams();

        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());

        this.filter.forEach((value, key) =>
            params.append(key, (key === 'startDate') ?
                (value as Date).toISOString() : value)
        );
        params.append('Filter', this.sorting);

        return params;
    }

    public fetchActivities = async (isLoading = true) => {
        if (this.currentLength === 0 ||
            this.activityRegistry.size !== this.currentLength) {
            this.setLoadingInitial(isLoading);
        }
        try {
            const result = await agent.Activities.list(this.axiosParams);
            result.data.forEach(this.addActivity);

            runInAction(() =>  {
                this.setPagination(result.pagination);
                this.currentLength = result.data.length;
            });
        }
        catch (error: any) {
            console.log(error);
        }
        this.setLoadingInitial(false);
    }

    public setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
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

    private get activitiesArrayFromMap() {
        return Array.from(this.activityRegistry.values());
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesArrayFromMap.reduce((activities, activity) => {
                const date = format(activity.date, 'dd MMM yyyy h:mm aa').slice(0, 11);
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

    public createActivity = async (activity: ActivityFormValues) => {
        const user = store.userStore.user!;
        await agent.Activities.create(activity);

        const newActivity = new Activity(activity);
        newActivity.hostUsername = user.username;
        newActivity.attendees = [new UserProfile(user)];

        this.addActivity(newActivity);
    }

    public updateActivity = async (activity: ActivityFormValues) => {
        await agent.Activities.update(activity);

        runInAction(() => {
            const activityId = activity.id!;
            let updatedActivity = {...this.activityRegistry.get(activityId), ...activity};

            const asActivity = updatedActivity as Activity;
            this.activityRegistry.set(activityId, asActivity);
            this.selectedActivity = asActivity;
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

    public cancelActivityToggle = async () => {
        this.isLoadingInitial = true;
        try {
            await agent.Activities.attend(this.selectedActivity!.id);
            runInAction(() => {
                this.selectedActivity!.isCancelled = !this.selectedActivity?.isCancelled;
                this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
            })
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.isLoadingInitial = false);
        }
    }

    public onEditClickAction = () => {
        this.setEditMode(!this.isEditMode);
    }

    public updateAttendance = async () => {
        const user = store.userStore.user!;
        this.isLoadingInitial = true;

        try {
            await agent.Activities.attend(this.selectedActivity!.id);
            runInAction(() => {
                if (this.selectedActivity?.isGoing) {
                    this.selectedActivity.attendees =
                        this.selectedActivity.attendees?.filter(
                            a => a.username !== user.username
                        );
                    this.selectedActivity.isGoing = false;
                } else {
                    const attendee = new UserProfile(user);
                    this.selectedActivity?.attendees?.push(attendee);
                    this.selectedActivity!.isGoing = true;
                }
                this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
            });
        }
        catch (error) {
            console.log(error);
        }
        finally {
            runInAction(() => this.isLoadingInitial = false);
        }
    }
}