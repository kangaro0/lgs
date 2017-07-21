export interface ILocation {
    id: number;
    title: string;
    addressLine: string;
    city: string;
    state: string;
    postcode: number;
    country: string;
    latitude: string;
    longitude: string;
}

export interface IUpdateLocation {
    id: number;
    title?: string;
    addressLine?: string;
    city?: string;
    state?: string;
    postcode?: number;
    country?: string;
    latitude?: string;
    longitude?: string;
}