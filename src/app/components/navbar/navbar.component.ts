import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Routes, RouterModule ,Router,RouterLinkActive} from '@angular/router';
import { PopupComponent } from '../../alerts/popup/popup.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    backButton=false;
    logoutButtonVisible;
    userData=JSON.parse(localStorage['userInfo']);
    logoutClass='';
    constructor(private dialog: MatDialog,private router:Router,private translateService:TranslateService,location: Location,  private element: ElementRef) {
          this.location = location;
          this.sidebarVisible = false;
    }

    ngOnInit(){
      this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        // setTimeout(function(){
        //     toggleButton.classList.add('toggled');
        // }, 500);
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
        if (this.sidebarVisible == false) {
            this.sidebarOpen();
            this.sidebarVisible = false
        } else {
           this.sidebarClose();
        }
    };

    getTitle(){
      var titlee =  this.router.url;
      if (titlee=='/') {
        return this.translateService.instant('BottomBarandTopBar.welcomeForMale')+" "+ this.userData.firstName;
      }
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 2 );
      }
      titlee = titlee.split('/').pop();
      if (titlee=='my-profile') {
         this.logoutClass="logoutButtonClass";
         this.logoutButtonVisible=true;
         return this.translateService.instant('BottomBarandTopBar.welcomeForMale')+" "+ this.userData.firstName
      }
      else if (titlee=='my-contribution' || titlee=='friends' ||titlee=='category-view') {
         return this.translateService.instant('BottomBarandTopBar.welcomeForMale')+" "+ this.userData.firstName
      }
      else if (titlee=='addContribution') {
         return this.translateService.instant('MenuScreen.Contribute');
      }
      else{
         return this.translateService.instant('BottomBarandTopBar.welcomeForMale')+" "+ this.userData.firstName
      }
    }

    goBack(): void { 
      if (this.router.url=='/article-details') {
       this.router.navigate(['/category-view'],{skipLocationChange:false});
      }
    }

    onLogOut(){
      this.openDialog("do you want to logout")
    }

     openDialog(msg): void {
      let dialogRef = this.dialog.open(PopupComponent, {
          width: '240px',
          data:{ message:msg}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result=='logOut'){
            localStorage.removeItem('isLoggedin');
            this.router.navigate(['/welcome-screen2'],{skipLocationChange:false})
          }
        }
      });
    }

    onWhatsappLogo(){
      window.open("https://play.google.com/store/apps/developer?id=WhatsApp+Inc.&hl=en");
    }

}
