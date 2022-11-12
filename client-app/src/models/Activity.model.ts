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
    title: 'Title',
    date: new Date(),
    description: 'Description',
    category: 'default',
    location: 'Location',
    venue: 'Venue',
}