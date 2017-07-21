
export interface IEvent {
    id?: number;
    title: string;
    date: string;
    time: string;
    organizer: string;
    location: string;
}

export interface IUpdateEvent {
    id: number;
    title?: string;
    date?: string;
    time?: string;
    organizer?: string;
    location?: string;
}