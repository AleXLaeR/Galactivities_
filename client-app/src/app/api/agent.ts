import axios, {AxiosError, AxiosResponse} from 'axios';
import { Activity } from '../../models/activity';
import {toast} from "react-toastify";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const { data, status } = error.response!;

    switch (status) {
        case 400:
            toast.error('bad request');
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 404:
            toast.error('not found');
            break;
        case 500:
            toast.error('server error');
            break;
        default:
            toast.error('unknown error');
            break;
    }

    return Promise.reject(error);
});

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post('/activities', activity),
    update: (activity: Activity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;