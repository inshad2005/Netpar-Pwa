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
  categoryData
  constructor(private appProvider:AppProvider,private router:Router) { 
    this.initializeData();
  }
    
  ngOnInit() {
    
  }

 	getTitle(){
    var title =  this.router.url;
    console.log(title)
    title = title.split('/').pop();
    if(title=='article-details'){
      if (this.articleData) {
       return this.articleData.categoryName
      }
    }else if(title=='homepage'){
      return this.sectionDetails.sectionName
    }else if(title=='homepage2'){
      return this.categoryData.categoryName
    }
    else{
      return title;
    }
  }

  goBack(): void { 
    if (this.router.url=='/article-details') {
     this.router.navigate(['/category-view'],{skipLocationChange:false});
    }
    if (this.router.url=='/comments') {
     this.router.navigate(['/article-details'],{skipLocationChange:false});
    }
    if (this.router.url=='/homepage') {
     this.router.navigate(['/category-view'],{skipLocationChange:false});
    } 
    if(this.router.url=='/homepage2'){
     this.router.navigate(['/homepage'],{skipLocationChange:false});
    }
    if(this.router.url=='/notification' || this.router.url=='/Faq'){
     this.router.navigate(['/category-view'],{skipLocationChange:false});
    }
    if(this.router.url=='/shareArticle'){
      if (localStorage.getItem('isLoggedin')) {
        this.router.navigate(['/category-view'],{skipLocationChange:false});
      }else{
        this.router.navigate(['/welcome-screen2'])
      }
     
    }
  }
   onWhatsappLogo(){
      window.open("https://play.google.com/store/apps/developer?id=WhatsApp+Inc.&hl=en");
    }

  initializeData(){
    if (this.appProvider.current.articleDetails) {
      this.articleData=this.appProvider.current.articleDetails;
    }
    if (this.appProvider.current.sectionDetails) {
      this.sectionDetails=this.appProvider.current.sectionDetails;
    }if (this.appProvider.current.categoryData) {
      this.categoryData=this.appProvider.current.categoryData; 
    }
  }
}
