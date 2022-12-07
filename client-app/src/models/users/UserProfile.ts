import { User } from "./User";

export interface UserProfile {
    username: string;
    displayName: string;
    imageUri?: string;
    biography?: string;
    followersCount: number;
    followingCount: number;
    isFollowing: boolean;
    images: ProfileImage[];
}

export class UserProfile implements UserProfile {
    public constructor(user: User) {
        this.username = user.username;
        this.displayName = user.displayName;
        this.imageUri = user.imageUri;
    }
}

export interface UserActivity {
    id: string;
    title: string;
    category: string;
    date: Date;
}

export interface ProfileImage {
    id: string;
    uri: string;
    isMain: boolean;
}