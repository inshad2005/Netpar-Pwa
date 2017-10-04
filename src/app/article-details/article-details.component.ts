import { Component, OnInit, ElementRef } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

   private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    count:number=1
    constructor(location: Location,  private element: ElementRef) {
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

}
