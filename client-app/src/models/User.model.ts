
export interface User {
    username: string;
    displayName: string;
    jwtToken: string;
    imageUri?: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
}