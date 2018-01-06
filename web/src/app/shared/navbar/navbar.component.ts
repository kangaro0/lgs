import { Component, OnInit } from '@angular/core'
import { Router, NavigationEnd  } from '@angular/router';

enum BackgroundType {
    VISIBLE,
    INVISIBLE
}

@Component({
    selector: 'navbar',
    styleUrls: [ './navbar.component.css' ],
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
    private title: string;

    constructor( private router: Router ){ }

    ngOnInit(){
        this.title = 'Lucky\'s Good Stuff';
    }
}