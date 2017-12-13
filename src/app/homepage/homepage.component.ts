import { Component, OnInit, ElementRef ,ViewContainerRef,OnDestroy} from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppProvider } from '../providers/app'
declare var jquery:any;
declare var $ :any;
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AllPostsService } from '../providers/allPost.service';
import { AnalyticsService } from '../providers/analytics.service' 

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers:[AllPostsService,AnalyticsService]
})
export class HomepageComponent implements OnInit,OnDestroy {
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    count:number=1;
    sectionData;
    categories;
    categoryTemplateStyle;
    userInfo=JSON.parse(localStorage['userInfo']);
    time=2;
    callAgain;
    templateId;

    constructor(private analyticsService:AnalyticsService,private allPostsService:AllPostsService ,vRef: ViewContainerRef,public toastr: ToastsManager,private router:Router,private appProvider:AppProvider,location: Location,  private element: ElementRef) {
      if(!this.appProvider.current.sectionDetails){
        this.router.navigate(['/category-view'])
      }
      this.location = location;
      this.sidebarVisible = false;
      this.toastr.setRootViewContainerRef(vRef);
    }
  	ngOnInit() {
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      this.getSectionDetails();
  	}

  	navRemove(){
  		if (localStorage['menuOpen']=='true') {
	  		const body = document.getElementsByTagName('body')[0];
	        this.toggleButton.classList.remove('toggled');
	        this.sidebarVisible = false;
	        body.classList.remove('nav-open');
  		}
  	}

  // ---------------------------------------------------mukul------------------------------------------------------------

    getSectionDetails(){
      this.sectionData=this.appProvider.current.sectionDetails;
      this.categories=this.sectionData.section_categories;
      console.log('homepage'+ JSON.stringify(this.sectionData));
      this.templateStyling();
      this.updateSectionTotalTime();
    }

    templateStyling(){
      if(this.sectionData.categoryView=='yes'){
        if (this.sectionData.section_categories.length==0) {
          this.categoryTemplateStyle="Category-view Template Four";
          console.log("Category-view Template Four");
          return;
        }else{
          if (this.sectionData.section_categories[0].categoryFormat) {
            this.categoryTemplateStyle=this.sectionData.section_categories[0].categoryFormat;
            console.log(this.categoryTemplateStyle)
          }
          else{
            this.categoryTemplateStyle="Category-view Template Four";
            console.log("Category-view Template Four");
          }
        }
      }else{
        this.categoryTemplateStyle="Category-view Template Four";
        console.log("Category-view Template Four")
      }
      this.analytics();
    }

    analytics(){
      if (this.categoryTemplateStyle=="Category-view Template One") {
        this.templateId="5a02c7b0844b224e07798c1a"
      }else if (this.categoryTemplateStyle=="Category-view Template Two") {
        this.templateId="5a02c7c1844b224e07798c1b"
      }else if (this.categoryTemplateStyle=="Category-view Template Three") {
        this.templateId="5a02c7c6844b224e07798c1c"
      }else if (this.categoryTemplateStyle=="Category-view Template Four") {
        this.templateId="5a02c812844b224e07798c1d"
      }
      this.analyticsService.templatateAnalayticUpdate(this.templateId,'view').subscribe(data=>{
        console.log(data);
      },err=>{
        console.log(err);
      })
    }

    // listViewStyling(){
    //     if (!this.sectionData.section_categories[0]) {
    //        this.appProvider.current.listingViewFormat="Listing-view Template One";
    //     }else if(this.sectionData.section_categories[0].listView=='yes'){
    //       this.appProvider.current.listingViewFormat=this.sectionData.section_categories[0].listViewFormat;
    //     }else{
    //      this.appProvider.current.listingViewFormat="Listing-view Template One"
    //     }
    //   console.log(this.appProvider.current.listingViewFormat)
    // }

   bgClass(i){
    if (i%5==0) {
      return "bg-yellow-g";
    }
    else if (i%5==1) {
      return "bg-red";
    }
    else if (i%5==2) {
      return "bg-pink";
    }
     else if (i%5==3) {
      return "bg-purple";
    }
     else if (i%5==4) {
      return "bg-green-g";
    }
  }

  onCategory(category){
    Observable.forkJoin([this.allPostsService.editCategoryPageView(this.userInfo._id,category._id),this.analyticsService.templatateAnalayticUpdate(this.templateId,'click')]).subscribe(data=>{
        console.log(data);
      },error=>{
        console.log(error);
    })
    console.log(category);
    if (category.section_subcategories.length==0) {
      console.log("nothing to show");
      this.showCustom();
    }else{
      this.appProvider.current.categoryData=category;
      if(category.listView=="yes"){
        this.appProvider.current.listingViewFormat=category.listViewFormat;
      }else{
        this.appProvider.current.listingViewFormat="Listing-view Template One";
      }
      this.router.navigate(['/homepage2'],{skipLocationChange:false});      
    }
  }


  showCustom() {
    console.log("toast function")
    this.toastr.custom('<span style="color: red">या प्रकारमध्ये उपप्रकार नाही</span>', null, {enableHTML: true});
  }

  updateSectionTotalTime(){
    this.allPostsService.editSectionTotalTime(this.sectionData._id,this.time).subscribe(data=>{
      console.log(data);
    },error=>{
      console.log(error);
    })
     this.callAgain=setTimeout(() => {
        this.updateSectionTotalTime()
      }, 2000);
  }

  ngOnDestroy(){
    clearTimeout(this.callAgain) 
  }


    
}
