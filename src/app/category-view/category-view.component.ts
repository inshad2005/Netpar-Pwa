import { Component, OnInit, Inject, HostListener, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT, BrowserModule } from '@angular/platform-browser';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FetchSectionsService } from '../providers/fetch-sections.service'


@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css'],
  providers:[FetchSectionsService]
})
export class CategoryViewComponent implements OnInit {
	private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    count:number=1
    constructor(private fetchSectionService:FetchSectionsService,location: Location,  private element: ElementRef) {
      	this.location = location;
        this.sidebarVisible = false;
    }
  	//constructor(@Inject(DOCUMENT) private document: any) { }
	fixedBoxOffsetTop: number  = 0;
	showDiv:boolean=false;

  	@ViewChild('fixedBox') fixedBox: ElementRef;
  	
  	ngOnInit() {
  		this.onWindowScroll();
  		const navbar: HTMLElement = this.element.nativeElement;
  		this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      this.fetchSections();
  	}

  	navRemove(){
  		if (localStorage['menuOpen']=='true') {
	  		const body = document.getElementsByTagName('body')[0];
	        this.toggleButton.classList.remove('toggled');
	        this.sidebarVisible = false;
	        body.classList.remove('nav-open');
  		}
  	}


  	@HostListener("window:scroll", [])
  	@HostListener("window:resize", [])

  	onWindowScroll() {
    	const rect = this.fixedBox.nativeElement.getBoundingClientRect();
    	if((-rect.top) > rect.height){
    		this.showDiv=true
  		}
  		else{
           this.showDiv=false
  		}
    	
	}
	slideConfig = {"slidesToShow": 4, "slidesToScroll": 2};

  fetchSections(){
    this.fetchSectionService.fetchSections().subscribe(data=>{
      console.log(JSON.stringify(data));
    },err =>{
      console.log(JSON.stringify(err));
    })
  }

}
