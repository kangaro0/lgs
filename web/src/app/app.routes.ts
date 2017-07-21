import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { BandComponent } from './components/band/band.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'band', component: BandComponent }
];

