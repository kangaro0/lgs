import { Component, OnInit, OnDestroy, Host } from '@angular/core'

import { EventService } from '../../services/event.service';
import { LocationService } from '../../services/location.service';

import { Event } from '../../entities/event.class';
import { Location } from '../../entities/location.class';

import { IEvent, IUpdateEvent } from '../../entities/event.interface';
import { ILocation, IUpdateLocation } from '../../entities/location.interface';

@Component({
    selector: 'events',
    styleUrls: [ './events.component.css' ],
    templateUrl: './events.component.html',
})
export class EventsComponent implements OnInit {

    public events: Array<Event>;

    constructor( private eventService: EventService<IEvent, IUpdateEvent>, private locationService: LocationService<ILocation, IUpdateLocation> ){
        this.events = new Array<Event>( 0 );
    }

    ngOnInit(){
        this.eventService.getAll().subscribe( event => {
            this.locationService.getById( event.id ).subscribe( location => {
                this.events.push( new Event( event, location ) );

                let sortNewest = ( a: Event, b: Event ) => {
                    if( new Date( a.date ) < new Date( b.date ) )
                        return -1;
                    else if( new Date( b.date ) < new Date( a.date ) )
                        return 1;
                    else
                        return 0;
                };

                this.events.sort( sortNewest );
            });
        });
    }

    ngOnDestroy(){

    }

}