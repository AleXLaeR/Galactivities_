import axios, { AxiosError, AxiosResponse } from 'axios';

import { Activity, ActivityFormValues } from 'models/activities/Activity';
import { User, UserFormValues } from "models/users/User";
import { UserProfile, UserActivity, ProfileImage } from "models/users/UserProfile";
import { PaginatedResult } from "models/Pagination";

import { store } from "app/stores/root.store";
import { router } from "app/router/Routes";
import { ROUTES } from "app/common/contants";

import { toast } from "react-toastify";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const sleep = (delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.jwtToken;
    if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
    }

    return config;
});

axios.interceptors.response.use(async response => {
    await sleep(1000);

    const pagination = response.headers['pagination'];

    if (pagination) {
        response.data = new PaginatedResult(
            response.data,
            JSON.parse(pagination)
        );

        return response as AxiosResponse<PaginatedResult<any>>;
    }

    return response;
}, (error: AxiosError) => {
    let { data, status: statusCode, config: { method } } = error.response!;
    const { errors } = data as any;

    switch (statusCode) {
        case StatusCodes.BAD_REQUEST:
            if (typeof data === 'string') {
                return toast.error(data);
            }
            if (method === 'get' && errors.hasOwnProperty('id')) {
                router.navigate(ROUTES.ERROR.NOT_FOUND);
            }

            if (errors) {
                const modalStateErrors = [];
                for (const key in errors) {
                    if (errors[key]) {
                        modalStateErrors.push(errors[key]);
                    }
                }
                throw modalStateErrors.flat();
            }
            break;
        case StatusCodes.UNAUTHORIZED:
            if (method !== 'post') {
                router.navigate(ROUTES.ERROR.UNAUTHORIZED);
            }
            break;
        case StatusCodes.FORBIDDEN:
            toast.error(ReasonPhrases.FORBIDDEN);
            setTimeout(() => store.activityStore.setSubmitMode(false), 500);
            break;
        case StatusCodes.NOT_FOUND:
            router.navigate(ROUTES.ERROR.NOT_FOUND);
            break;
        case StatusCodes.INTERNAL_SERVER_ERROR:
            toast.error(ReasonPhrases.INTERNAL_SERVER_ERROR);
            break;
        default:
            toast.error(ReasonPhrases.TOO_MANY_REQUESTS);
            break;
    }

    return Promise.reject(error);
});

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string, params?: URLSearchParams) => axios.get<T>(url, {params}).then(responseBody),
    post: <T> (url: string, body: {}, headers?: {}) => axios.post<T>(url, body, headers).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Activities = {
    list: (params: URLSearchParams) => requests.get<PaginatedResult<Activity[]>>(ROUTES.ACTIVITIES.LIST, params),
    details: (id: string) => requests.get<Activity>(`${ROUTES.ACTIVITIES.LIST}/${id}`),
    create: (activity: ActivityFormValues) => requests.post(ROUTES.ACTIVITIES.LIST, activity),
    update: (activity: ActivityFormValues) => requests.put(`${ROUTES.ACTIVITIES.LIST}/${activity.id}`, activity),
    delete: (id: string) => requests.delete(`${ROUTES.ACTIVITIES.LIST}/${id}`),
    attend: (id: string) => requests.post(`${ROUTES.ACTIVITIES.LIST}/${id}${ROUTES.ACTIVITIES.ATTEND}`, {})
}

const Account = {
    current: () => requests.get<User>(ROUTES.ACCOUNT.CURRENT_USER),
    login: (user: UserFormValues) => requests.post<User>(ROUTES.ACCOUNT.LOGIN, user),
    register: (user: UserFormValues) => requests.post<User>(ROUTES.ACCOUNT.REGISTER, user),
}

const Profiles = {
    get: (username: string) => requests.get<UserProfile>(`${ROUTES.PROFILE.BASE}/${username}`),
    update: (profile: Partial<UserProfile>) => requests.put(ROUTES.PROFILE.BASE, profile),
    uploadImage: (file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return requests.post<ProfileImage>(ROUTES.IMAGES.BASE, formData, {
            headers: { 'Content-Type': 'multipart/create-activity-form-data' }
        })
    },
    setMain: (id: string) => requests.post(`${ROUTES.IMAGES.BASE}/${id}/setMain`, {}),
    deleteImage: (id: string) => requests.delete(`${ROUTES.IMAGES.BASE}/${id}`),
    listActivities: (username: string, filter?: string) => requests.get<UserActivity[]>(
        `${ROUTES.PROFILE.BASE}/${username}${ROUTES.ACTIVITIES.LIST}?filter=${filter}`
    ),
    updateFollowing: (username: string) => requests.post(`/follow/${username}`, {}),
    listFollowings: (username: string, followType: string) =>
        requests.get<UserProfile[]>(`/follow/${username}?followType=${followType}`),
}

const agent = {
    Activities,
    Account,
    Profiles,
}

export default agent;