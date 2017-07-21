import {Component} from '@angular/core';

import { LocationService } from '../../services/location.service';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
  providers: [
    LocationService
  ]
})
export class HomeComponent {
}
