import { Component, OnInit, ElementRef,AfterViewInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppProvider } from '../providers/app'
import { DomSanitizer } from '@angular/platform-browser';
import { AllPostsService } from '../providers/allPost.service' ;
import { ArticleLikeModel,ArticleCommentModel } from './article-detail.model.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommentsComponent } from './comments/comments.component';



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
    articleCommentModel:ArticleCommentModel=new ArticleCommentModel();
    count:number=1;
    articleData;
    aritcleContents;
    likeClass;
    likeIcon='cusIco-okay-o';
    latestComment;
    userData=JSON.parse(localStorage['userInfo']);
    constructor(private dialog: MatDialog,private allPostsService:AllPostsService,private domSanitizer: DomSanitizer,private appProvider:AppProvider,location: Location,  private element: ElementRef) {
      	this.location = location;
        this.sidebarVisible = false;
    }

  	ngOnInit() {
  		//this.listTitles = ROUTES.filter(listTitle => listTitle);
  		const navbar: HTMLElement = this.element.nativeElement;
  		this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      this.articleData=this.appProvider.current.articleDetails;
      console.log(this.articleData);
      this.getComments();
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
           this.likeIcon='cusIco-okay';
           this.articleData.likeCount = this.articleData.likeCount+1;  
        }
        if (data.success==false) { 
          this.likeIcon='cusIco-okay-o';
          this.articleData.likeCount = this.articleData.likecount-1;
        }
      },err=>{

      })
    }

    getComments(){
      let len = this.articleData.user_comments.length;
      console.log(len);
      console.log(JSON.stringify(this.articleData.user_comments))
      this.latestComment = this.articleData.user_comments[len-1];
      console.log(this.latestComment);
    }

    onComment(){
      this.articleCommentModel.userId=this.userData._id;
      this.articleCommentModel.articleName=this.articleData.headline;
      this.articleCommentModel.articleId=this.articleData._id;
      this.articleCommentModel.userPhone=this.userData.mobileNumber;
      this.articleCommentModel.userName=this.userData.firstName+" "+this.userData.lastName;
      this.articleCommentModel.sectionName=this.articleData.sectionName;
      this.articleCommentModel.categoryName=this.articleData.categoryName;
      this.articleCommentModel.subCategoryName=this.articleData.subCategoryName;
      this.articleCommentModel.language=localStorage['selectedLanguage'];
      this.allPostsService.commentPost(this.articleCommentModel).subscribe(data=>{
        console.log(JSON.stringify(data));
        this.latestComment=data.response;
        this.articleData.commentCount=this.articleData.commentCount+1;
      })
    }

    onViewMore(){
      let dialogRef = this.dialog.open(CommentsComponent, {
            width: '360px',
            data:{comments:this.articleData.user_comments}
        });
        dialogRef.afterClosed().subscribe(result => {
        
        });
    }
   
}
