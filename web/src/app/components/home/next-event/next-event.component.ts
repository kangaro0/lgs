import { Component } from '@angular/core';

export interface Event {
    date: string;
    title: string;
}

@Component({
    selector: 'next-event',
    styleUrls: [ './next-event.component.css' ],
    templateUrl: './next-event.component.html'
})
export class NextEventComponent {

    public event: Event;

    constructor( ){

    }
}