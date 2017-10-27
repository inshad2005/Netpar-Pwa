import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppProvider } from '../providers/app'
import { DomSanitizer } from '@angular/platform-browser';
import { AllPostsService } from '../providers/allPost.service' ;
import { ArticleLikeModel } from './article-detail.model.component';



@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
  providers:[AllPostsService]
})
export class ArticleDetailsComponent implements OnInit {

    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    articleLikeModel: ArticleLikeModel = new ArticleLikeModel ();
    count:number=1;
    articleData;
    aritcleContents;
    likeClass;
    likeIcon;
    userData=JSON.parse(localStorage['userInfo']);
    constructor(private allPostsService:AllPostsService,private domSanitizer: DomSanitizer,private appProvider:AppProvider,location: Location,  private element: ElementRef) {
      	this.location = location;
        this.sidebarVisible = false;
    }

  	ngOnInit() {
  		//this.listTitles = ROUTES.filter(listTitle => listTitle);
  		const navbar: HTMLElement = this.element.nativeElement;
  		this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      this.articleData=this.appProvider.current.articleDetails;
      console.log(this.userData);
      // this.getSafeContent(this.articleData.contentBody)
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

    slideConfig = {"slidesToShow": 2, "slidesToScroll": 2, "arrows": false};

    // ---------------------------------mukul--------------------------------------------

    getSafeContent(content) {
        return this.domSanitizer.bypassSecurityTrustHtml(content);
    }

    onLike(){
      this.articleLikeModel.articleId=this.articleData._id;
      this.articleLikeModel.articleName=this.articleData.headline;
      this.articleLikeModel.userId=this.userData._id;
      this.articleLikeModel.userPhone=this.userData.mobileNumber;
      this.allPostsService.likePost(this.articleLikeModel).subscribe(data=>{
        console.log(JSON.stringify(data));
        if (data.success==true && data.msg=="Post liked successfully!") {
           this.likeIcon='cusIco-okay'
        }
        if (data.success==false) { 
          this.likeIcon='cusIco-okay-o'
        }
      },err=>{

      })
    }
}
