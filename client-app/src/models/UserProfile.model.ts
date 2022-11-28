import { User } from "./User.model";
import {ProfileImage} from "./Image.model";

export interface UserProfile {
    username: string;
    displayName: string;
    imageUri?: string;
    biography?: string;
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