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
    private headers: Headers;

    constructor( public http: Http ){
        this.headers = new Headers();
        this.headers.append( 'Access-Control-Allow-Origin', '*' );
     }

    set EndpointURL( str: string ) { this.endpointURL = str; }

    getAll( ){
        return this.http.get( this.endpointURL, { headers: this.headers } ).flatMap( ( res: Response ) => res.json() ).map( ( item: ILocation ) => item );
    }

    getById( id: number ): Observable<ILocation> {
        return this.http.get( this.endpointURL + '/' + id, { headers: this.headers } ).map( ( res: Response ) =>  res.json() ).map( ( item: ILocation ) => item );
    }

    create( item: ILocation ): Observable<Response> {
        return this.http.post( this.endpointURL, JSON.stringify( event ), { headers: this.headers } ).map( ( res: Response ) => res.json() );
    }

    update( item: IUpdateLocation ): Observable<Response> {
        return this.http.put( this.endpointURL + '/' + item["id"], JSON.stringify( event ), { headers: this.headers } ).map( ( res: Response ) => res.json() );
    }

    delete( id: number ): Observable<Response> {
        return this.http.delete( this.endpointURL + '/' + id, { headers: this.headers } ).map( ( res: Response ) => res.json() );
    }
}