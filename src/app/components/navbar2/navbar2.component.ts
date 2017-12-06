import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common'; 
import { Routes, RouterModule ,Router,RouterLinkActive} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css']
})


export class Navbar2Component implements OnInit {

  	private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(private translateService:TranslateService,private router:Router,location: Location,  private element: ElementRef) {
      this.location = location;
      this.sidebarVisible = false;
    }

    ngOnInit(){
      this.listTitles = ROUTES.filter(listTitle => listTitle);
      // alert(JSON.stringify(this.listTitles));
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
        localStorage['menuOpen']='true'
    };

    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
        localStorage['menuOpen']='false'
    };

    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
            this.sidebarVisible = false
        } else {
           //this.sidebarClose();
        }
    };

   getTitle(){
      var titlee =  this.router.url;
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 2 );
      }
      titlee = titlee.split('/').pop();
      if (titlee=='login') {
        return this.translateService.instant('WelcomeScreen.SignIn')
      }
      else if (titlee=='registerationStepOne') {
         return this.translateService.instant('WelcomeScreen.SignUp');
      }
      else if (titlee=='register') {
         return this.translateService.instant('WelcomeScreen.SignUp');
      }
      else if (titlee=='otp') {
         return this.translateService.instant('OTPScreen.Otp');
      }
      return titlee
    }

}
