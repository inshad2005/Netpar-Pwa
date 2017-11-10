import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppProvider } from '../providers/app'
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    count:number=1;
    sectionData;
    categories;
    categoryTemplateStyle;
    constructor(private appProvider:AppProvider,location: Location,  private element: ElementRef) {
      this.location = location;
      this.sidebarVisible = false;
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
    }

    templateStyling(){
      if(this.sectionData.categoryView=='yes'){
        if (!this.sectionData.section_categories[0]) {
          this.categoryTemplateStyle="Category-view Template Four";
          console.log("Category-view Template Four");
          return;
        }
        if (this.sectionData.section_categories[0].categoryFormat=="Category-view Template One") {
           this.categoryTemplateStyle="Category-view Template One";
           console.log("Category-view Template One")
        }
        else if (this.sectionData.section_categories[0].categoryFormat=="Category-view Template Two") {
          this.categoryTemplateStyle="Category-view Template Two";
          console.log("Category-view Template Two")
        }
        else if(this.sectionData.section_categories[0].categoryFormat=='Category-view Template Three'){
          this.categoryTemplateStyle="Category-view Template Three";
          console.log("Category-view Template Three")
        }
        else if(this.sectionData.section_categories[0].categoryFormat=='Category-view Template Four'){
          this.categoryTemplateStyle="Category-view Template Four";
          console.log("Category-view Template Four")
        }
      }else{
        this.categoryTemplateStyle="Category-view Template Four";
        console.log("Category-view Template Four")
      }
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

    
}
