import { Component, OnInit, ElementRef ,ViewContainerRef} from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppProvider } from '../providers/app'
declare var jquery:any;
declare var $ :any;
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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
    constructor( vRef: ViewContainerRef,public toastr: ToastsManager,private router:Router,private appProvider:AppProvider,location: Location,  private element: ElementRef) {
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
    }

    templateStyling(){
      this.listViewStyling();
      if(this.sectionData.categoryView=='yes'){
        if (!this.sectionData.section_categories[0]) {
          this.categoryTemplateStyle="Category-view Template Four";
          console.log("Category-view Template Four");
          return;
        }else{
            this.categoryTemplateStyle=this.sectionData.section_categories[0].categoryFormat;
            console.log(this.categoryTemplateStyle)
        }
      }else{
        this.categoryTemplateStyle="Category-view Template Four";
        console.log("Category-view Template Four")
      }
    }

    listViewStyling(){
        if (!this.sectionData.section_categories[0]) {
           this.appProvider.current.listingViewFormat="Listing-view Template One";
        }else if(this.sectionData.section_categories[0].listView=='yes'){
          this.appProvider.current.listingViewFormat=this.sectionData.section_categories[0].listViewFormat;
        }else{
         this.appProvider.current.listingViewFormat="Listing-view Template One"
        }
      console.log(this.appProvider.current.listingViewFormat)
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

    onCategory(category){
      console.log(category);
      if (category.section_subcategories.length==0) {
        console.log("nothing to show");
        this.showCustom();
      }else{
        this.appProvider.current.categoryData=category;
        this.router.navigate(['/homepage2'],{skipLocationChange:true});      
      }
    }


    showCustom() {
      console.log("toast function")
      this.toastr.custom('<span style="color: red">या प्रकारमध्ये उपप्रकार नाही</span>', null, {enableHTML: true});
    }
    
}
