import { IEvent } from './event.interface';
import { Location } from './location.class';
import { ILocation } from './location.interface';

export class Event {
    public id: number;
    public title: string;
    public date: string;
    public time: string;
    public organizer: string;
    public location: Location;

    constructor( event: IEvent, location: ILocation ){
        this.id = event.id;
        this.title = event.title;
        this.date = event.date;
        this.time = event.time;
        this.organizer = event.organizer;
        this.location = location;
    }
}