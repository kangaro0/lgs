import { NgModule }      from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { AgmCoreModule } from '@agm/core';

import { EventService } from '../../services/event.service'
import { LocationService } from '../../services/location.service'

import { EventsComponent } from './events.component'

@NgModule({
    declarations: [
        EventsComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyB5F03Y9UByURJCtIFXoL1lB5eD7jSWD2s'
        })
    ],
    providers: [
        EventService,
        LocationService
    ],
    bootstrap: [ EventsComponent ]
})
export class EventsModule { }