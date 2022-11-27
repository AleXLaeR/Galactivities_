import axios, { AxiosError, AxiosResponse } from 'axios';

import {Activity, ActivityFormValues} from '../../models/Activity.model';
import { User, UserFormValues } from "../../models/User.model";

import { toast } from "react-toastify";
import { history } from "../../index";

import { store } from "../stores/root.store";
import { ROUTES } from "../../utils/contants.utils";

import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import {UserProfile} from "../../models/UserProfile.model";
import {ProfileImage} from "../../models/Image.model";


const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
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
    return response;
}, (error: AxiosError) => {
    let { data, status, config } = error.response!;
    const newData = data as any;

    switch (status) {
        case StatusCodes.BAD_REQUEST:
            if (typeof data === 'string') {
                return toast.error(data);
            }
            if (config.method === 'get' && newData.errors.hasOwnProperty('id')) {
                history.push(ROUTES.ERROR.NOT_FOUND);
            }

            const { errors } = newData;
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
            history.push(ROUTES.ERROR.UNAUTHORIZED);
            break;
        case StatusCodes.FORBIDDEN:
            toast.error(ReasonPhrases.FORBIDDEN);
            setTimeout(() => store.activityStore.setSubmitMode(false), 500);
            break;
        case StatusCodes.NOT_FOUND:
            history.push(ROUTES.ERROR.NOT_FOUND);
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
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    postWithHeaders: <T> (url: string, body: {}, headers: {}) =>
        axios.post<T>(url, body, headers).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Activities = {
    list: () => requests.get<Activity[]>(ROUTES.ACTIVITIES.LIST),
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
        return requests.postWithHeaders<ProfileImage>(ROUTES.IMAGES.BASE, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    setMain: (id: string) => requests.post(`${ROUTES.IMAGES.BASE}/${id}/setMain`, {}),
    deleteImage: (id: string) => requests.delete(`${ROUTES.IMAGES.BASE}/${id}`),
}

const agent = {
    Activities,
    Account,
    Profiles,
}

export default agent;