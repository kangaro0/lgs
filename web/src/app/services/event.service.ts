import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/mergeMap";

import { Event } from '../interfaces/event.interface';

@Injectable()
export class EventService {
    private static EndpointURL: string = "http://localhost/lgs1/api/public/events";

    constructor( public http: Http ){ }

    getAll( ){
        return this.http.get( EventService.EndpointURL ).flatMap( ( res: Response ) => res.json() );
    }

    getById( id: number ): Event {
        return this.http.get( EventService.EndpointURL + '/' + id ).map( ( res: Response ) => {
            
        });
    }

    post( ){

    }

}
