import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/mergeMap";

import { IEvent, IUpdateEvent } from '../entities/event.interface';
import { IRestService } from '../interfaces/service.interface';

@Injectable()
export class EventService< IEvent, IUpdateEvent > implements IRestService< IEvent, IUpdateEvent > {

    private endpointURL: string = "http://localhost/lgs1/api/public/events";
    private headers: Headers;

    constructor( public http: Http ){
        this.headers = new Headers();
        this.headers.append( 'Access-Control-Allow-Origin', '*' );
     }

    set EndpointURL( str: string ) { this.endpointURL = str; }
    get EndpointURL() { return this.endpointURL; }

    getAll( ): Observable<IEvent> {
        return this.http.get( this.endpointURL, { headers: this.headers } ).flatMap( ( res: Response ) => res.json() ).map( ( item: IEvent ) => item );
    }

    getById( id: number ): Observable<IEvent> {
        return this.http.get( this.endpointURL + '/' + id, { headers: this.headers } ).map( ( res: Response ) =>  res.json() ).map( ( item: IEvent ) => item );
    }

    create( item: IEvent ): Observable<Response> {
        return this.http.post( this.endpointURL, JSON.stringify( event ), { headers: this.headers } ).map( ( res: Response ) => res.json() );
    }

    update( item: IUpdateEvent ): Observable<Response> {
        return this.http.put( this.endpointURL + '/' + item["id"], JSON.stringify( event ), { headers: this.headers } ).map( ( res: Response ) => res.json() );
    }

    delete( id: number ): Observable<Response> {
        return this.http.delete( this.endpointURL + '/' + id, { headers: this.headers } ).map( ( res: Response ) => res.json() );
    }

    /* zusaetzliche Methoden, event-spezifisch */

    next( ): Observable<IEvent> {
        return this.http.get( this.endpointURL + '/next', { headers: this.headers } ).map( ( res: Response ) => res.json() );
    }
}
