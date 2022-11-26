import { User } from "./User.model";
import {Image} from "./Image.model";

export interface UserProfile {
    username: string;
    displayName: string;
    imageUri?: string;
    biography?: string;
    images?: Image[];
}

export class UserProfile implements UserProfile {
    public constructor(user: User) {
        this.username = user.username;
        this.displayName = user.displayName;
        this.imageUri = user.imageUri;
    }
}