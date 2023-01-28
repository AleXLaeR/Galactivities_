import { makeAutoObservable, runInAction } from 'mobx';
import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { store } from './root.store';
import Comment from "models/comments/Comment";
import * as process from 'process';

export default class CommentStore {
    comments: Comment[] = [];
    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    public createHubConnection = (activityId?: string) => {
        if (activityId) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl(`${process.env.REACT_APP_CHAT_URL}?activityId=${activityId}`, {
                    skipNegotiation: true,
                    transport: HttpTransportType.WebSockets,
                    accessTokenFactory: () => store.userStore.user?.token ?? ''
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            this.hubConnection
                .start()
                .catch((error) => console.log(`Error establishing hub connection: ${error}`));

            this.hubConnection.on('LoadComments', (comments: Comment[]) => {
                runInAction(() => {
                    comments.forEach(comment => {
                        comment.createdAt = new Date(comment.createdAt + 'Z');
                    });
                    this.comments = comments
                        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
                });
            });

            this.hubConnection.on('ReceiveComment', (comment: Comment) => {
                runInAction(() => {
                    comment.createdAt = new Date(comment.createdAt);
                    this.comments.unshift(comment);
                });
            });
        }
    }

    public stopHubConnection = () => {
        this.hubConnection?.stop()
            .catch((error) => console.log(`Error stopping hub connection: ${error}`));
    }

    public clearComments = () => {
        this.comments = [];
        this.stopHubConnection();
    }

    public addComment = async (values: any) => {
        values.activityId = store.activityStore.selectedActivity?.id;

        try {
            await this.hubConnection?.invoke('SendComment', values);
        }
        catch (error: any) {
            console.log(error);
        }
    }
}