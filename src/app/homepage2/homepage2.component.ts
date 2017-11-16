import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppProvider } from '../providers/app';
import { Router } from '@angular/router';


@Component({
  selector: 'app-homepage2',
  templateUrl: './homepage2.component.html',
  styleUrls: ['./homepage2.component.css']
})
export class Homepage2Component implements OnInit {

  	private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    count:number=1;
    sectionData;
    categoryData;
    subCategoryTemplateStyle
    constructor(private router:Router,private appProvider:AppProvider,location: Location,  private element: ElementRef) {
      	this.location = location;
        this.sidebarVisible = false;
    }
  	ngOnInit() {
  		//this.listTitles = ROUTES.filter(listTitle => listTitle);
      this.categoryData=this.appProvider.current.categoryData;

  		const navbar: HTMLElement = this.element.nativeElement;
  		this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
     
      this.templateStyling();
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

    templateStyling(){
      if(this.categoryData.subCategoryView=='yes'){
        if (!this.categoryData.section_subcategories[0].subCategoryFormat) {
          this.subCategoryTemplateStyle="SubCategory-view Template Four";
          console.log("SubCategory-view Template Four");
          return;
        }
        if (this.categoryData.section_subcategories[0].subCategoryFormat=="SubCategory-view Template One") {
           this.subCategoryTemplateStyle="Category-view Template One";
           console.log("Category-view Template One")
        }
        else if (this.categoryData.section_subcategories[0].subCategoryFormat=="SubCategory-view Template Two") {
          this.subCategoryTemplateStyle="SubCategory-view Template Two";
          console.log("SubCategory-view Template Two")
        }
        else if(this.categoryData.section_subcategories[0].subCategoryFormat=='SubCategory-view Template Three'){
          this.subCategoryTemplateStyle="SubCategory-view Template Three";
          console.log("SubCategory-view Template Three")
        }
        else if(this.categoryData.section_subcategories[0].subCategoryFormat=='SubCategory-view Template Four'){
          this.subCategoryTemplateStyle="SubCategory-view Template Four";
          console.log("SubCategory-view Template Four")
        }
      }else{
        this.subCategoryTemplateStyle="SubCategory-view Template Four";
        console.log("SubCategory-view Template Four")
      }
    }

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

  onSubcategory(subcategory){
    console.log(subcategory)
    this.router.navigate(['/listing-view'],{skipLocationChange:true})
  }

}
