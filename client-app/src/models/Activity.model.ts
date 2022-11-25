import { UserProfile } from "./UserProfile.model";

export type Activity = {
    id: string;
    title: string;
    date: Date;
    description: string;
    category: string;
    location: string;
    venue: string;
    hostUsername?: string;
    isCancelled?: boolean;
    isGoing?: boolean;
    isHost?: boolean;
    host?: UserProfile;
    attendees?: UserProfile[];
}

export const DEFAULT_STATE: Activity = {
    id: '',
    title: '',
    date: new Date(),
    description: '',
    category: '',
    location: '',
    venue: '',
}