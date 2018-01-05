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
    private navElement;
    private activeNavElement;
    private elements: Array<string> = [
        '', 'home', 'band', 'gallery', 'events'
    ];

    constructor( private router: Router ){ }

    ngOnInit(){
        this.title = 'Lucky\'s Good Stuff';
        this.navElement = document.getElementById( 'navbar' );

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd ) {
                this.work( event.url.substring( 1 ) );
            }
        });
    }

    private work( url: string ){
        if( !this.elements.find( ( item ) => item === url ) )
            return;

        if( url === 'home' || url === '/' ){
            this.setBackground( BackgroundType.INVISIBLE, [] );
        }
        else{
            this.setBackground( BackgroundType.VISIBLE, [ '#3E3F3A' ] );
        }

    }

    private setBackground( type: BackgroundType, args: Array<string> ){
        switch( type ){

            case BackgroundType.INVISIBLE: 
                this.navElement.style.background = 'none';
                break;

            case BackgroundType.VISIBLE:
                this.navElement.style.background = args[0];
                break;
        }
    }
}