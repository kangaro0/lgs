import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { EventService } from '../../services/event.service';
import { LocationService } from '../../services/location.service';

import { HomeComponent } from './home.component';
import { NextEventComponent } from './next-event/next-event.component';

@NgModule({
    declarations: [
        HomeComponent,
        NextEventComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
    ],
    providers: [
        EventService,
        LocationService
    ],
    bootstrap: [ HomeComponent ]
})
export class HomeModule { }