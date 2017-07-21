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

    constructor( public http: Http ){ }

    set EndpointURL( str: string ) { this.endpointURL = str; }

    getAll( ){
        let headers = new Headers();
        headers.append( 'Access-Control-Allow-Origin', '*' );

        return this.http.get( this.endpointURL ).flatMap( ( res: Response ) => res.json() ).map( ( item: IEvent ) => item );
    }

    getById( id: number ): Observable<IEvent> {
        return this.http.get( this.endpointURL + '/' + id ).map( ( res: Response ) =>  res.json() ).map( ( item: IEvent ) => item );
    }

    create( item: IEvent ): Observable<Response> {
        return this.http.post( this.endpointURL, JSON.stringify( event )).map( ( res: Response ) => res.json() );
    }

    update( item: IUpdateEvent ): Observable<Response> {
        return this.http.put( this.endpointURL + '/' + item["id"], JSON.stringify( event ) ).map( ( res: Response ) => res.json() );
    }

    delete( id: number ): Observable<Response> {
        return this.http.delete( this.endpointURL + '/' + id ).map( ( res: Response ) => res.json() );
    }

    /* zusaetzliche Methoden, event-spezifisch */

    next( ): Observable<IEvent> {
        let headers = new Headers();
        headers.append( 'Access-Control-Allow-Origin', '*' );

        return this.http.get( this.endpointURL + '/next', { headers: headers } ).map( ( res: Response ) => res.json() );
    }
}
