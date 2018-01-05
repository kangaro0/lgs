import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/mergeMap";

@Component({
    selector: 'carousel',
    styleUrls: [ './carousel.component.css' ],
    templateUrl: './carousel.component.html'
})
export class CarouselComponent implements OnInit {

    constructor() { }

    ngOnInit(){
        
    }
}
