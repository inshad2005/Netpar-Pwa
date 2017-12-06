import { Component, OnInit, ElementRef,ViewChild,AfterViewChecked } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { ShareDialogComponent } from '../alerts/share-dialog/share-dialog.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AllPostsService }from '../providers/allPost.service'
import { AppProvider }from '../providers/app'

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
  providers :[AllPostsService]
})
export class FriendsComponent implements OnInit {
    @ViewChild('tabGroup') tabGroup;
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    count:number=1;
    userData=JSON.parse(localStorage['userInfo']);
    friends;
    loading=false;
    constructor(private appProvider:AppProvider,private allPostsService:AllPostsService,private dialog: MatDialog,location: Location,  private element: ElementRef) {
      	this.location = location;
        this.sidebarVisible = false;
    }
  	ngOnInit() {
  		//this.listTitles = ROUTES.filter(listTitle => listTitle);
  		const navbar: HTMLElement = this.element.nativeElement;
  		this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      this.getFriends();
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
          width: '300px',
      });
      dialogRef.afterClosed().subscribe(result => {
        
      });
    }

    getFriends(){
      this.loading=true;
      this.allPostsService.getFriends(this.userData.myFriends).subscribe(data=>{
        console.log(data)
        this.loading=false;
        this.friends=data.contacts;
      },error=>{
        console.log(error);
        this.loading=false;
      })
    }

    // ngAfterViewChecked(){
    //   console.log('afterViewInit => ', this.tabGroup.selectedIndex);
    //   if (this.appProvider.current.selectedTab=="inviteFriend") {
    //     this.tabGroup.selectedIndex=1;
    //   }
    // }
}
