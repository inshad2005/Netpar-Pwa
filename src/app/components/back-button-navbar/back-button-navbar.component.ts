import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule ,Router,RouterLinkActive} from '@angular/router';
import { AppProvider } from '../../providers/app'

@Component({
  selector: 'app-back-button-navbar',
  templateUrl: './back-button-navbar.component.html',
  styleUrls: ['./back-button-navbar.component.css']
})
export class BackButtonNavbarComponent implements OnInit {
  articleData
  sectionDetails
  constructor(private appProvider:AppProvider,private router:Router) { 
    this.articleData=this.appProvider.current.articleDetails;
    this.sectionDetails=this.appProvider.current.sectionDetails;
    console.log(this.articleData.subCategoryName)
  }
    
  ngOnInit() {
    
  }

 	getTitle(){
    var title =  this.router.url;
    title = title.split('/').pop();
    if(title=='article-details'){
      if (this.articleData) {
       return this.articleData.subCategoryName
      }
    }else if(title=='homepage'){
      return this.sectionDetails.sectionName
    }
    else{
      return title;
    }
  }

  goBack(): void { 
    if (this.router.url=='/article-details') {
     this.router.navigate(['/category-view'],{skipLocationChange:true});
    }
    if (this.router.url=='/comments') {
     this.router.navigate(['/article-details'],{skipLocationChange:true});
    }
    if (this.router.url=='/homepage') {
     this.router.navigate(['/category-view'],{skipLocationChange:true});
    }
  }
}
