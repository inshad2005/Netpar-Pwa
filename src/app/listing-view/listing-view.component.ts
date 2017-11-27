import { Component, OnInit, ElementRef,OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppProvider } from '../providers/app'
import { Router } from '@angular/router';
import { AllPostsService } from '../providers/allPost.service' 

@Component({
  selector: 'app-listing-view',
  templateUrl: './listing-view.component.html',
  styleUrls: ['./listing-view.component.css'],
  providers:[AllPostsService]
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
    subCategoryData=this.appProvider.current.subCategoryData;
    constructor(private allPostsService:AllPostsService,private router:Router,private appProvider:AppProvider,location: Location,  private element: ElementRef) {
      	this.location = location;
        this.sidebarVisible = false;
        this.allArticles=this.appProvider.current.allArticles.response.filter(f=>f.subCategoryName==this.appProvider.current.subCategoryData.subCategoryName);
        this.listingViewFormat=this.appProvider.current.listingViewFormat;
        console.log('listviewdata'+ JSON.stringify(this.allArticles));
        console.log(this.listingViewFormat)
        this.getArticleData();
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
      this.appProvider.current.articleDetails=articleData;
      this.router.navigate(["/article-details"],{skipLocationChange:true});
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

}
