import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule ,Router,RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-back-button-navbar',
  templateUrl: './back-button-navbar.component.html',
  styleUrls: ['./back-button-navbar.component.css']
})
export class BackButtonNavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    
  }

 	getTitle(){
    var title =  this.router.url;
    title = title.split('/').pop();
    return title;
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
