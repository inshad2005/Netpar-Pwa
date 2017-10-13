import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule ,Router,RouterLinkActive} from '@angular/router';
import { FetchSectionsService } from '../../providers/fetch-sections.service';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'home', title: 'Administrator',  icon: 'dashboard', class: '' },
    { path: 'admin', title: 'Template',  icon: 'dashboard', class: '' },
    { path: 'user-profile', title: 'Section',  icon:'person', class: '' },
    { path: 'table-list', title: 'Content',  icon:'content_paste', class: '' },
    { path: 'typography', title: 'User contribution',  icon:'library_books', class: '' },
    { path: 'icons', title: 'Homepage',  icon:'bubble_chart', class: '' },
    { path: 'maps', title: 'User',  icon:'location_on', class: '' },
    { path: 'notifications', title: 'Platform Analytics',  icon:'notifications', class: '' },
    { path: 'upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers:[RouterLinkActive,FetchSectionsService]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  adminPath;
  sectionPath;
  content;
  analaytics;
  template;
  sections;
  profile;

  constructor(private fetchSectionsService:FetchSectionsService ,private route:Router, private activeLink:RouterLinkActive) { }

  ngOnInit() {
    //alert(this.route.url)
      this.fetchSections();
      this.menuItems = ROUTES.filter(menuItem => menuItem);

       if (this.route.url=="/home" ||this.route.url=="/edit-admin") {
            this.adminPath="in";
            this.sectionPath=' ';
            this.content=' ';
            this.analaytics=' ';
            this.template=' ';
            this.profile='';

        } else if(this.route.url=="/view-section" ||this.route.url=="/add-section" ||this.route.url=="/add-category" || this.route.url=="/add-subcategory"){
            this.adminPath=" ";
            this.sectionPath='in';
            this.content=' ';
            this.analaytics=' ';
            this.template=' ';
            this.profile='';
        }else if (this.route.url=='/add-content' || this.route.url=='/view-content' || this.route.url=='/comment') {
            this.adminPath=" ";
            this.sectionPath=' ';
            this.content='in';
            this.analaytics=' ';
            this.template=' ';
            this.profile='';
          // code...
        }else if (this.route.url=='/section-analytics' || this.route.url=='/template-analytics'||this.route.url=='/element-analytics'||this.route.url=='/article-analytics') {
          // code...
             this.adminPath="";
            this.sectionPath=' ';
            this.content=' ';
            this.analaytics='in';
            this.template=' ';
            this.profile='';
        }else if (this.route.url=='/section-templates' || this.route.url=='/category-templates' ||this.route.url=='/list-templates' ||this.route.url=='/homepage-templates') {
          // code...
            this.adminPath="";
            this.sectionPath=' ';
            this.content=' ';
            this.analaytics=' ';
            this.template='in';
            this.profile='';
        }
        else if (this.route.url=='/profile' || this.route.url=='/edit-profile') {
          // code...
            this.adminPath="";
            this.sectionPath=' ';
            this.content=' ';
            this.analaytics=' ';
            this.template='';
            this.profile='in';
        }
        else{
            this.adminPath=" ";
            this.sectionPath=' ';
            this.content=' ';
            this.analaytics=' ';
            this.template=' ';
            this.profile='';
        }
}

  /*ngOnInit() {
      System.import('../../assets/js/sidebar-moving-tab.js');
        this.menuItems = ROUTES.filter(menuItem => menuItem);
  }*/
  
  // isMobileMenu() {
  //     if ($(window).width() > 991) {
  //         return false;
  //     }
  //     return true;
  // };


   //--------------------------------------------mukul---------------------------------------------------
   fetchSections(){
    this.fetchSectionsService.fetchSections().subscribe(data=>{
      // console.log(JSON.stringify(data));
      if (data.success==true) {
        this.sections=data.FinalArray;
      }
      
    },err =>{
      console.log(JSON.stringify(err));
    })
  } 
}
