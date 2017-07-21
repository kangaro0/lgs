import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/mergeMap";

import { EventService } from '../../../services/event.service';
import { LocationService } from '../../../services/location.service';

import { IEvent, IUpdateEvent } from '../../../entities/event.interface';
import { Event } from '../../../entities/event.class';
import { ILocation, IUpdateLocation } from '../../../entities/location.interface';
import { Location } from '../../../entities/location.class';

@Component({
    selector: 'next-event',
    styleUrls: [ './next-event.component.css' ],
    templateUrl: './next-event.component.html'
})
export class NextEventComponent implements OnInit {

    public date: string;
    public title: string;

    constructor( public eventService: EventService<IEvent, IUpdateEvent>, public locationService: LocationService<ILocation, IUpdateLocation> ){ }

    ngOnInit( ){
        this.eventService.next().subscribe( event => {
            this.locationService.getById( event.id ).subscribe( location => {
                let newEvent = new Event( event, location );

                let part = newEvent.date.split('-');

                this.date = part[ 2 ].split(' ')[0] + '.' + part[1]; 
                this.title = newEvent.title;
            });
        });
    }


}