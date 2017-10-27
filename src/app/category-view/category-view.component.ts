import { Component, OnInit, Inject, HostListener, ViewChild, ElementRef,AfterViewInit,OnDestroy } from '@angular/core';
import { DOCUMENT, BrowserModule } from '@angular/platform-browser';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FetchSectionsService } from '../providers/fetch-sections.service';
import { AllPostsService } from'../providers/allPost.service' ;
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { AppProvider } from '../providers/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css'],
  providers:[FetchSectionsService,AllPostsService]
})
export class CategoryViewComponent implements AfterViewInit ,OnDestroy{
	  private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    count:number=1;
    sections;
    bgClasses;
    thumbnailUrl=environment.thumbnail;
    allPostData;
    constructor(private appProvider:AppProvider,private router:Router,private allPostsService:AllPostsService,private fetchSectionService:FetchSectionsService,location: Location,  private element: ElementRef) {
      this.location = location;
      this.sidebarVisible = false;
    }
  	//constructor(@Inject(DOCUMENT) private document: any) { }
	fixedBoxOffsetTop: number  = 0;
	showDiv:boolean=false;

  	@ViewChild('fixedBox') fixedBox: ElementRef;
  	
  	ngAfterViewInit() {
  		this.onWindowScroll();
  		const navbar: HTMLElement = this.element.nativeElement;
  		this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      // this.fetchSections();
      // this.fetchAllPosts();
      this.fetchData();
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


// -----------------------------------------------------------mukul-----------------------------------------------
  getThumbnailImage(imageName){
    return environment.thumbnail+imageName;
  }

  bgClass(i){
    if (i%7==0) {
      return "bg-red";
    }
    else if (i%7==1) {
      return "bg-orange";
    }
    else if (i%7==2) {
      return "bg-yellow-g";
    }
     else if (i%7==3) {
      return "bg-blue";
    }
     else if (i%7==4) {
      return "bg-green-g";
    }
     else if (i%7==5) {
      return "bg-purple";
    }
     else if (i%7==6) {
      return "bg-pink";
    }
  }

  colorClass(i){
    if (i%7==0) {
      return "color-red";
    }
    else if (i%7==1) {
      return "color-orange";
    }
    else if (i%7==2) {
      return "color-yellow";
    }
     else if (i%7==3) {
      return "color-blue";
    }
     else if (i%7==4) {
      return "color-green";
    }
     else if (i%7==5) {
      return "color-purple";
    }
     else if (i%7==6) {
      return "color-pink";
    }
  }


  onSections(sec){
    console.log(JSON.stringify(sec));
  }

  onFeeds(articleData){
    this.appProvider.current.articleDetails=articleData;
    this.router.navigate(["/article-details"],{skipLocationChange:true});
  }

  getclass(i){
    if (i%6>2) {
      return 'new'
    }
  }

  fetchData(){
    Observable.forkJoin([this.fetchSectionService.fetchSections(), this.allPostsService.allPosts()]).subscribe(results => {
      this.sections=results[0].FinalArray;
      this.allPostData=results[1].response;
    });
  }

  ngOnDestroy(){
    
  }


}
