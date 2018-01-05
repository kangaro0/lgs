import { ILocation } from './location.interface';

export class Location {
    public id: number;
    public title: string;
    public addressLine: string;
    public city: string;
    public state: string;
    public postcode: number;
    public country: string;
    public latitude: number;
    public longitude: number;

    constructor( locData: ILocation ){
        this.id = locData.id;
        this.title = locData.title;
        this.addressLine = locData.addressLine;
        this.city = locData.city;
        this.state = locData.state;
        this.postcode = locData.postcode;
        this.country = locData.country;
        this.latitude = Number( locData.latitude );
        this.longitude = Number( locData.longitude );
    }
}