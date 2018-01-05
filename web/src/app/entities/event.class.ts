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

    public day: string;
    public month: string;

    constructor( event: IEvent, location: ILocation ){
        this.id = event.id;
        this.title = event.title;
        this.date = ( new Date( event.date ) ).toJSON();    //2015-10-26T07:46:36.611Z
        this.time = event.time;
        this.organizer = event.organizer;
        this.location = new Location( location );

        this.day = this.date.split( '-' )[ 2 ].split( 'T' )[ 0 ];
        this.month = this.date.split( '-' )[ 1 ];
    }
}