export type Activity = {
    id: string;
    title: string;
    date: string;
    description: string;
    category: string;
    location: string;
    venue: string;
}

export const DEFAULT_STATE: Activity = {
    id: '',
    title: 'Title',
    date: '',
    description: 'Description',
    category: 'default',
    location: 'Location',
    venue: 'Venue',
}