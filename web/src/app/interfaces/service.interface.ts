/*
    IRestService
    Interface for restful services, used for data exchange
*/
import { Response } from '@angular/http';
import { Observable } from 'rxjs';

export interface IRestService<T, U> {
    EndpointURL: string;

    getAll: () => Observable<T>;
    getById: ( id: number ) => Observable<T>; 
    create: ( item: T ) => Observable<Response>;
    update: ( item: U ) => Observable<Response>;
    delete: ( id: number ) => Observable<Response>;
}