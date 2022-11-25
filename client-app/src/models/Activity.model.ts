import { UserProfile } from "./UserProfile.model";

export type Activity = {
    id: string;
    title: string;
    date: Date;
    description: string;
    category: string;
    location: string;
    venue: string;
    hostUsername: string;
    isCancelled: boolean;
    attendees: UserProfile[];
}

export const DEFAULT_STATE: Activity = {
    id: '',
    title: '',
    date: new Date(),
    description: '',
    category: '',
    location: '',
    venue: '',
    hostUsername: '',
    isCancelled: false,
    attendees: [],
}