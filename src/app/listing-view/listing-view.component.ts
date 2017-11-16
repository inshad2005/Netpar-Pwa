import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppProvider } from '../providers/app'

@Component({
  selector: 'app-listing-view',
  templateUrl: './listing-view.component.html',
  styleUrls: ['./listing-view.component.css']
})
export class ListingViewComponent implements OnInit {

  	private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    count:number=1
    allArticles;

    constructor(private appProvider:AppProvider,location: Location,  private element: ElementRef) {
      	this.location = location;
        this.sidebarVisible = false;
        this.allArticles=this.appProvider.current.allArticles;
        console.log(this.allArticles);
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

}
