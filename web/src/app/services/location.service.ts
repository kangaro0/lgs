import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/mergeMap";

import { ILocation, IUpdateLocation } from '../entities/location.interface';
import { IRestService } from '../interfaces/service.interface';

@Injectable()
export class LocationService< ILocation, IUpdateLocation > implements IRestService< ILocation, IUpdateLocation > {

    private endpointURL: string = "http://localhost/lgs1/api/public/locations";

    constructor( public http: Http ){ }

    set EndpointURL( str: string ) { this.endpointURL = str; }

    getAll( ){
        let headers = new Headers();
        headers.append( 'Access-Control-Allow-Origin', '*' );

        return this.http.get( this.endpointURL ).flatMap( ( res: Response ) => res.json() ).map( ( item: ILocation ) => item );
    }

    getById( id: number ): Observable<ILocation> {
        let headers = new Headers();
        headers.append( 'Access-Control-Allow-Origin', '*' );

        return this.http.get( this.endpointURL + '/' + id, { headers: headers } ).map( ( res: Response ) =>  res.json() ).map( ( item: ILocation ) => item );
    }

    create( item: ILocation ): Observable<Response> {
        let headers = new Headers();
        headers.append( 'Access-Control-Allow-Origin', '*' );

        return this.http.post( this.endpointURL, JSON.stringify( event )).map( ( res: Response ) => res.json() );
    }

    update( item: IUpdateLocation ): Observable<Response> {
        let headers = new Headers();
        headers.append( 'Access-Control-Allow-Origin', '*' );

        return this.http.put( this.endpointURL + '/' + item["id"], JSON.stringify( event ) ).map( ( res: Response ) => res.json() );
    }

    delete( id: number ): Observable<Response> {
        let headers = new Headers();
        headers.append( 'Access-Control-Allow-Origin', '*' );

        return this.http.delete( this.endpointURL + '/' + id ).map( ( res: Response ) => res.json() );
    }
}