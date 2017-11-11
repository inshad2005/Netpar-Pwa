import { Component, OnInit, ElementRef,AfterViewInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppProvider } from '../providers/app'
import { DomSanitizer } from '@angular/platform-browser';
import { AllPostsService } from '../providers/allPost.service' ;
import { ArticleLikeModel,ArticleCommentModel,SaveArticle } from './article-detail.model.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommentsComponent } from './comments/comments.component';
import { ValidationBoxesComponent } from '../alerts/validation-boxes/validation-boxes.component'
import { Router } from '@angular/router';
import 'rxjs/Rx';
// import  * as download from 'file-download'
import { Http ,Headers,RequestOptions,ResponseContentType} from '@angular/http';
import {saveAs} from "file-saver";

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
    saveArticle:SaveArticle=new SaveArticle();
    count:number=1;
    articleData;
    aritcleContents;
    likeClass;
    likeIcon;
    saveIcon;
    saveClass
    latestComment;
    continueClass="read-panel";
    continueButtonVisible=true;
    userData=JSON.parse(localStorage['userInfo']);
    constructor(private http:Http,private router:Router,private dialog: MatDialog,private allPostsService:AllPostsService,private domSanitizer: DomSanitizer,private appProvider:AppProvider,location: Location,  private element: ElementRef) {
      	this.location = location;
        this.sidebarVisible = false;
    }

  	ngOnInit() {
  		//this.listTitles = ROUTES.filter(listTitle => listTitle);
  		const navbar: HTMLElement = this.element.nativeElement;
  		this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      this.articleData=this.appProvider.current.articleDetails;
      // console.log(this.articleData);
      this.getComments();
      this.likeOrNot();
      this.savedOrNot();
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

    likeOrNot(){
      if (this.articleData.liked==false) {
        this.likeIcon='cusIco-okay-o';
        this.likeClass="";
      }else if (this.articleData.liked=true) {
        this.likeIcon='cusIco-okay';
        this.likeClass="active"
      }
    }

    savedOrNot(){
      if (this.articleData.saved==false) {
        console.log('false')
        this.saveIcon="cusIco-badge-o";
        this.saveClass="";
      }else if (this.articleData.saved=true) {
        console.log('true')
        this.saveIcon='cusIco-badge';
        this.saveClass="active"
      }
    }

    onLike(){
      this.articleLikeModel.articleId=this.articleData._id;
      this.articleLikeModel.articleName=this.articleData.headline;
      this.articleLikeModel.userId=this.userData._id;
      this.articleLikeModel.userPhone=this.userData.mobileNumber;
      this.allPostsService.likePost(this.articleLikeModel).subscribe(data=>{
        // console.log(JSON.stringify(data));
        if (data.success==true && data.msg=="Post liked successfully!") {
           this.likeIcon='cusIco-okay';
           this.likeClass="active";
           this.articleData.likeCount = this.articleData.likeCount+1;  
        }
        if (data.success==false) { 
          this.likeIcon='cusIco-okay-o';
          this.likeClass=""
          // this.articleData.likeCount = this.articleData.likecount-1;
        }
      },err=>{

      })
    }

    getComments(){
      if (this.articleData.user_comments) {
         let len = this.articleData.user_comments.length;
        // console.log(len);
        // console.log(JSON.stringify(this.articleData.user_comments))
        this.latestComment = this.articleData.user_comments[len-1];
        // console.log(this.latestComment);
      }
    }
    
    onCommentIcon(){
      document.getElementById("mycomment").focus();
    }

    onComment(){
      if (!this.articleCommentModel.userComment) {
        this.openValidationAlert("please enter comment");
        return
      }
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
        // console.log(JSON.stringify(data));
        this.latestComment=data.response;
        this.articleData.commentCount=this.articleData.commentCount+1;
      })
    }

    onSavePost(){
      this.saveArticle.user_id=this.userData._id;
      this.saveArticle.content_name=this.articleData.headline;
      this.saveArticle.content_id=this.articleData._id;
      this.allPostsService.savePost(this.saveArticle).subscribe(data=>{
        console.log(JSON.stringify(data));
        if (data.success==true) {
          this.saveIcon="cusIco-badge";
          this.articleData.saveCount=this.articleData.saveCount+1;
        }
      },err=>{
        console.log(err)
      })
    }

    onViewMore(){
      if (this.articleData.user_comments.length>0) {
        this.appProvider.current.comments=this.articleData.user_comments;
        this.router.navigate(['/comments'],{skipLocationChange:true})
      }
      else{
        console.log('no comment to display')
      }
    }

    openValidationAlert(msg){
        let dialogRef = this.dialog.open(ValidationBoxesComponent, {
            width: '260px',
            data:{ message:msg}
        });
        dialogRef.afterClosed().subscribe(result => {
          document.getElementById("mycomment").focus();
        });
    }

   // downloadFile(data: Response){
   //   console.log(data)
   //    var blob = new Blob([data], {type: "url" });
   //    var url= window.URL.createObjectURL(blob);
   //    console.log(url)
   //    window.open(url);
   //  }

    onDownload(){
      for (var i = 0; i < this.articleData.contentBody.length; ++i) {
        if (this.articleData.contentBody[i].tag=='image') {
          var url = this.articleData.contentBody[i].url;
          // this.downloadFile(url);
        }
      }
    }

    downloadFilee(url){
      console.log(url)
      const fr = new FileReader();
        fr.onloadend = (loadEvent) => {
            let demo = fr.result;
            console.log(demo)
        };
        fr.readAsDataURL(url);
    }


    // onDownloadimage(){
    //   download('http://unicorn.com/foo.jpg', 'dist').then(() => {
    //       console.log('done!');
    //   });
    // }

  downloadFile() {
    this.http.get('http://ionicteam.com/netpar/uploads/content/contentData/1509737827.jpeg').subscribe(
        (response) => {
          console.log(response);
          var mediaType = 'image/jpeg';
          var blob = new Blob([response], {type: mediaType});
          console.log(blob);
          var filename = 'test.pdf';
          saveAs(blob, filename);
        });
  }

  getSafeUrl(url){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onContinueReading(){
    this.continueButtonVisible=false
    return this.continueClass="";
  }

}
