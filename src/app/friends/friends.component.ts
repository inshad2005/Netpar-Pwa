import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { ShareDialogComponent } from '../alerts/share-dialog/share-dialog.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AllPostsService }from '../providers/allPost.service'

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
  providers :[AllPostsService]
})
export class FriendsComponent implements OnInit {

  private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    count:number=1
    constructor(private allPostsService:AllPostsService,private dialog: MatDialog,location: Location,  private element: ElementRef) {
      	this.location = location;
        this.sidebarVisible = false;
    }
  	ngOnInit() {
  		//this.listTitles = ROUTES.filter(listTitle => listTitle);
  		const navbar: HTMLElement = this.element.nativeElement;
  		this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
  	}

  	navRemove(){
  		/*alert('home')*/
  		if (localStorage['menuOpen']=='true') {

	  		const body = document.getElementsByTagName('body')[0];
	        this.toggleButton.classList.remove('toggled');
	        this.sidebarVisible = false;
	        body.classList.remove('nav-open');
  			//localStorage['menuOpen']=='false'
  		}
  	}

    onInviteFriends(){
      let dialogRef = this.dialog.open(ShareDialogComponent, {
          width: '260px',
      });
      dialogRef.afterClosed().subscribe(result => {
        
      });
    }

    getFriends(){
      this.allPostsService.getFriends('').subscribe(data=>{
        console.log(data);
      },error=>{
        console.log(error);
      })
    }
}
