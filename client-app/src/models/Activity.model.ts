export type Activity = {
    id: string;
    title: string;
    date: Date;
    description: string;
    category: string;
    location: string;
    venue: string;
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