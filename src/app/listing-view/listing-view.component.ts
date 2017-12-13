import { Component, OnInit, ElementRef,OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppProvider } from '../providers/app'
import { Router } from '@angular/router';
import { AllPostsService } from '../providers/allPost.service';
import { AnalyticsService } from '../providers/analytics.service'

@Component({
  selector: 'app-listing-view',
  templateUrl: './listing-view.component.html',
  styleUrls: ['./listing-view.component.css'],
  providers:[AllPostsService,AnalyticsService]
})
export class ListingViewComponent implements OnInit,OnDestroy {

  	private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    count:number=1
    allArticles;
    listingViewFormat;
    articleDataAtZeroIndex;
    articleData;
    callAgain;
    time=2;
    subCategoryData;
    templateId;
    constructor(private analyticsService:AnalyticsService,private allPostsService:AllPostsService,private router:Router,private appProvider:AppProvider,location: Location,  private element: ElementRef) {
      	if (!this.appProvider.current.subCategoryData) {
          this.router.navigate(['/category-view'])
        }else{
          this.subCategoryData=this.appProvider.current.subCategoryData;
          this.location = location;
          this.sidebarVisible = false;
          this.allArticles=this.appProvider.current.allArticles.response.filter(f=>f.subCategoryName==this.appProvider.current.subCategoryData.subCategoryName);
          this.listingViewFormat=this.appProvider.current.listingViewFormat;
          // console.log('listviewdata'+ JSON.stringify(this.allArticles));
          // console.log(this.listingViewFormat)
          this.getArticleData();
          this.analytics();
        }
    }

  	ngOnInit() {
  		//this.listTitles = ROUTES.filter(listTitle => listTitle);
  		const navbar: HTMLElement = this.element.nativeElement;
  		this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      this.updateSubCategoriesTotalTime();
  	}

  	navRemove(){
  		if (localStorage['menuOpen']=='true') {
  		  const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
  		}
  	}

    getArticleData(){
      this.articleDataAtZeroIndex=this.allArticles[0];
      this.allArticles.splice(0, 1);
    }
    
    colorClass(i){
      if (i%5==0) {
        return "color-yellow";
      }
      else if (i%5==1) {
        return "color-red";
      }
      else if (i%5==2) {
        return "color-pink";
      }
       else if (i%5==3) {
        return "color-purple";
      }
       else if (i%5==4) {
        return "color-green";
      }
    }

    getclass(i){
      if (i%6>2) {
        return 'new'
      }
    }

    onArticle(articleData){
      this.analyticsService.templatateAnalayticUpdate(this.templateId,'click').subscribe(data=>{
        console.log(data);
      },err=>{
        console.log(err);
      })
      this.appProvider.current.articleDetails=articleData;
      this.router.navigate(["/article-details"],{skipLocationChange:false});
    }


  updateSubCategoriesTotalTime(){
    this.allPostsService.editSubCategoriesTotalTime(this.subCategoryData._id,this.time).subscribe(data=>{
      console.log(data);
    },error=>{
      console.log(error);
    })
     this.callAgain=setTimeout(() => {
        this.updateSubCategoriesTotalTime()
      }, 2000);
  }

  ngOnDestroy(){
    clearTimeout(this.callAgain) 
  }

  analytics(){
    if (this.listingViewFormat=='Listing-view Template One') {
      this.templateId="5a02dc635f10a4640ef6ecf8";
    }else if (this.listingViewFormat=='Listing-view Template Two') {
      this.templateId="5a02dc6a5f10a4640ef6ecf9";
    }else if (this.listingViewFormat=='Listing-view Template Three') {
      this.templateId="5a02dc705f10a4640ef6ecfa";
    }else if (this.listingViewFormat=='Listing-view Template Four') {
      this.templateId="5a02dc755f10a4640ef6ecfb";
    }else if (this.listingViewFormat=='Listing-view Template Five') {
      this.templateId="5a02dc7a5f10a4640ef6ecfc";
    }else if (this.listingViewFormat=='Listing-view Template Six') {
      this.templateId="5a02dc7f5f10a4640ef6ecfd";
    }else if (this.listingViewFormat=='Listing-view Template Seven') {
      this.templateId="5a02dc845f10a4640ef6ecfe";
    }
    this.analyticsService.templatateAnalayticUpdate(this.templateId,'view').subscribe(data=>{
      console.log(data)
    },err=>{
      console.log(err)
    })
  }

}
