import { IEvent } from './event.interface';
import { Location } from './location.class';

export class Event {
    public id: number;
    public title: string;
    public date: string;
    public time: string;
    public organizer: string;
    public location: Location;

    constructor( eventData: IEvent ){
        this.id = eventData.id;
        this.title = eventData.title;
        this.date = eventData.date;
        this.time = eventData.time;
        this.organizer = eventData.organizer;
        this.location = new Location( eventData.location );
    }
}