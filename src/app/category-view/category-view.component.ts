import { Component, OnInit, Inject, HostListener, ViewChild, ElementRef,AfterViewInit,OnDestroy } from '@angular/core';
import { DOCUMENT, BrowserModule,DomSanitizer } from '@angular/platform-browser';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FetchSectionsService } from '../providers/fetch-sections.service';
import { AllPostsService } from'../providers/allPost.service' ;
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { AppProvider } from '../providers/app';
import { AnalyticsService } from '../providers/analytics.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';

declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css'],
  providers:[FetchSectionsService,AllPostsService]
})
export class CategoryViewComponent implements OnInit ,OnDestroy{
	  private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    count:number=1;
    sections;
    bgClasses;
    thumbnailUrl=environment.thumbnail;
    allPostData;
    loading=false;
    activeSessionTime;
    userInfo=JSON.parse(localStorage['userInfo']);
    userid;
    sectionTemplate;
    isChanged;
    previousTemplate;
    callAgain;
    constructor(private domSanitizer:DomSanitizer,private analyticsService: AnalyticsService,private appProvider:AppProvider,private router:Router,private allPostsService:AllPostsService,private fetchSectionService:FetchSectionsService,location: Location,  private element: ElementRef) {
      this.location = location;
      this.sidebarVisible = false;
      this.userid=this.userInfo._id;
    }
  	//constructor(@Inject(DOCUMENT) private document: any) { }
	fixedBoxOffsetTop: number  = 0;
	showDiv:boolean=false;

  	@ViewChild('fixedBox') fixedBox: ElementRef;
  	
  	ngOnInit() {
  		this.onWindowScroll();
  		const navbar: HTMLElement = this.element.nativeElement;
  		this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      // this.fetchSections();
      // this.fetchAllPosts();
      this.fetchData();
      // this.updateSession()
    }

    scrollFunction(){
      var ulHeight = $('.homepage-ulist').outerHeight();
      var liHeight = $('.homepage-ulist li').outerHeight();
      var sum = 0;
      var i = 1;
      if($('.homepage-ulist li').length > 5){
        $('.homepage-ulist li:lt(5)').each(function () {
          sum = sum + $(this).outerHeight();
        });
        liHeight = sum;
        $('.homepage-ulist').height(liHeight);
      }
    }

    swipr(swipe){
       
      $(swipe).closest('.homepage-listing').find('.homepage-ulist').toggleClass('active');
      $(swipe).find('.up-down').toggle();
    
    }

    getIndex(i){
      if (i==0) {
        this.scrollFunction();
      }
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
    this.loading=true
    Observable.forkJoin([this.fetchSectionService.fetchSections(), this.allPostsService.allPosts(this.userid)]).subscribe(results => {
      this.loading=false
      this.sections=results[0].FinalArray;
      this.allPostData=results[1].response.filter(f=> f.publishStatus =="true" ||  f.publishStatus ==true);
      this.fetchSection();
    });
  }
  
  ngOnDestroy(){
    clearTimeout(this.callAgain) 
  }

  setSectionTemplate(){
    console.log(this.sections[0].sectionViewFormat)
    this.previousTemplate=this.sections[0].sectionViewFormat;
    if (this.sections[0].sectionViewFormat=="Section Template One") {
      this.sectionTemplate="Section Template One";
    }else{
      this.sectionTemplate="default Template";
       console.log(this.sectionTemplate)
    }
  }

  reloadPage(){
    if (this.isChanged=true) {
     this.ngOnInit();
    }
  }


  updateSession(){
    if (localStorage['userInfo']) {
      this.analyticsService.updateSessionCount(this.userid).subscribe(data=>{
        console.log(JSON.stringify(data));
        this.activeSessionTime=data.lastUpdated;
        this.activeTime();
      },err=>{
        console.log(err);
      })
    }
  }

  activeTime(){
    if (localStorage['userInfo']) {
      this.analyticsService.appUsingTime(this.userid,this.activeSessionTime).subscribe(data=>{
        console.log(JSON.stringify(data));
        this.activeSessionTime=this.activeSessionTime+2;
      },err=>{

      })
      setTimeout(() => {
        this.activeTime()
      }, 2000);
    }
  }

  onSection(sectionData){
    this.router.navigate(['/homepage'],{skipLocationChange:true})
    console.log(JSON.stringify(sectionData));
    this.appProvider.current.sectionDetails=sectionData;
    this.appProvider.current.articleDetails=this.allPostData
  }

  fetchSection(){
    this.fetchSectionService.fetchSections().subscribe(data=>{
        this.setSectionTemplate();
        let value= data.FinalArray[0].sectionViewFormat;
        if(this.previousTemplate==value){
          this.isChanged=false;
          console.log(this.isChanged)
        }else{
          this.isChanged=true;
          console.log(this.isChanged);
          this.ngOnInit();
        }
    },err=>{

    })
    this.callAgain=setTimeout(() => {
      this.fetchSection();
    }, 5000);
  }
   
}
