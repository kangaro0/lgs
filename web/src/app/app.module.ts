import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { HomeModule } from './components/home/home.module';
import { BandModule } from './components/band/band.module';
import { EventsModule } from './components/events/events.module';

import { NavbarComponent } from './shared/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true }),
    HomeModule,
    BandModule,
    EventsModule
  ],
  providers: [
    NavbarComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
