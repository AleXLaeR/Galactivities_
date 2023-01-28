import { makeAutoObservable, reaction, runInAction } from 'mobx';

import { Activity, ActivityFormValues } from 'models/activities/Activity';
import agent from '../api/agent';

import { format } from 'date-fns';

import { store } from './root.store';
import { UserProfile } from 'models/users/UserProfile';
import { Pagination, PagingParams } from 'models/Pagination';

export type SortType = 'date' | 'dateDescending' | 'popularity' |
    'popularityDescending' | 'relevancy' | 'relevancyDescending';
type ActivityGroup = { [key: string]: Activity[] };

export enum FilterType {
    NONE = 'all',
    BY_DATE = 'startDate',
    BY_HOST = 'isHost',
    BY_ATTENDANCE = 'isGoing',
}

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;

    isEditMode = false;
    isSubmitMode = false;
    isLoadingInitial = false;

    pagination: Pagination | null = null;
    pagingParams = new PagingParams();

    activityFilter = new Map().set(FilterType.NONE, true);

    sortActivitiesBy: SortType = 'date';

    private currentLength: number = 0;

    public constructor() {
        makeAutoObservable(this);

        const onReaction = () => {
            this.pagingParams = new PagingParams();
            this.activityRegistry.clear();
            this.fetchActivities().then();
        }

        reaction(() => this.activityFilter.keys(), onReaction);
        reaction(() => this.sortActivitiesBy,onReaction);
    }

    public setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    public setFilter = (filter: FilterType, value?: any) => {
        const resetFilter = () => {
            this.activityFilter.forEach((value, key) => {
                if (key !== FilterType.BY_DATE) {
                    this.activityFilter.delete(key);
                }
            });
        }

        switch (filter) {
            case FilterType.NONE:
                resetFilter();
                this.activityFilter.set(FilterType.NONE, value);
                break;
            case FilterType.BY_ATTENDANCE:
                resetFilter();
                this.activityFilter.set(FilterType.BY_ATTENDANCE, value);
                break;
            case FilterType.BY_HOST:
                resetFilter();
                this.activityFilter.set(FilterType.BY_HOST, value);
                break;
            case FilterType.BY_DATE:
                this.activityFilter.delete(FilterType.BY_DATE);
                this.activityFilter.set(FilterType.BY_DATE, value);
                break;
        }
    }

    public updateAttendeeFollowings = (username: string) => {
        this.activityRegistry.forEach(({ attendees }) => {
            attendees.forEach(attendee => {
                if (attendee.username === username) {
                    attendee.isFollowing ? attendee.followersCount-- : attendee.followersCount++;
                    attendee.isFollowing = !attendee.isFollowing;
                }
            });
        });
    }

    public setSorting = (sortBy: SortType) => {
        this.sortActivitiesBy = sortBy;
    }

    private get axiosParams() {
        const params = new URLSearchParams();

        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());

        this.activityFilter.forEach((value, key) =>
            params.append(key, (key === FilterType.BY_DATE) ?
                (value as Date).toISOString() : value.toString())
        );

        params.append('Filter', this.sortActivitiesBy);
        return params;
    }

    public fetchActivities = async (isLoading: boolean = true) => {
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

    public get groupedActivities() {
        return Object.entries(
            this.activitiesArrayFromMap.reduce((group, activity) => {
                const date = format(activity.date, 'dd MMM yyyy h:mm aa').slice(0, 11);
                group[date] ??= [activity];
                return group;
            }, {} as ActivityGroup)
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
            let updatedActivity = {
                ...this.activityRegistry.get(activityId),
                ...activity
            } as Activity;

            this.activityRegistry.set(activityId, updatedActivity);
            this.selectedActivity = updatedActivity;
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

    public clearSelectedActivity = () => {
        this.selectedActivity = undefined;
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
                            ({ username }) => username !== user.username
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