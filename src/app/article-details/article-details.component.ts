import { Component, OnInit, ElementRef,AfterViewInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppProvider } from '../providers/app'
import { DomSanitizer } from '@angular/platform-browser';
import { AllPostsService } from '../providers/allPost.service' ;
import { ArticleLikeModel,ArticleCommentModel,SaveArticle } from './article-detail.model.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA ,MatSnackBar,MatSnackBarVerticalPosition} from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { CommentsComponent } from './comments/comments.component';
import { ValidationBoxesComponent } from '../alerts/validation-boxes/validation-boxes.component'
import { Router } from '@angular/router';
import { TranslationService } from '../providers/translation.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import 'rxjs/Rx';
import { DownloadPopupComponent } from '../alerts/download-popup/download-popup.component';
import { AnalyticsService } from '../providers/analytics.service'

// import  * as download from 'file-download'
import { Http ,Headers,RequestOptions,ResponseContentType,RequestMethod} from '@angular/http';
import { saveAs } from "file-saver";
declare var google;

declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
  providers:[AnalyticsService,AllPostsService,TranslationService]
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
    likeButtonClass;
    saveButtonClass;
    downloadButtonClass="inactive";
    likeIcon;
    saveIcon;
    saveClass;
    downloadClass;
    downloadIcon="cusIco-donload-o";
    latestComment;
    continueClass="read-panel";
    continueButtonVisible=true;
    userData=JSON.parse(localStorage['userInfo']);
    snackbarMessage;
    currentString:any;
    sendString:any;
    selectedValue:any;
    currentActiveIndex:number;
    outputStringArrayLength:number;
    caretPos
    elementRefrence:any;
    inputStringLength:number;
    outputStringLength:number;
    viewAllComment;
    guideTextImage=false;
    textFirstSpan:string='';
    textSecondSpan:string='';
    downloadedMedia=[];
    savedGuideText=false;
    downloadGuideText=false;

    constructor(private analyticsService:AnalyticsService,public toastr: ToastsManager,private translationService:TranslationService,private translateService:TranslateService,private snackBar: MatSnackBar,private http:Http,private router:Router,private dialog: MatDialog,private allPostsService:AllPostsService,private domSanitizer: DomSanitizer,private appProvider:AppProvider,location: Location,  private element: ElementRef) {
      	this.location = location;
        this.sidebarVisible = false;
    }

  	ngOnInit() {
  		//this.listTitles = ROUTES.filter(listTitle => listTitle);
  		const navbar: HTMLElement = this.element.nativeElement;
  		this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      this.articleData=this.appProvider.current.articleDetails;
      this.appProvider.current.article_id=this.articleData._id;
      this.appProvider.current.articleHeadline=this.articleData.headline;
      console.log(this.articleData.categoryId);
      console.log(this.articleData.sectionId);
      this.getComments();
      this.likeOrNot();
      this.savedOrNot();
      // this.googleTransliterateFunction();
      this.viewArticle();
      this.sectionSeprator();
      this.analyticsService.trackEvent(this.articleData.headline);
      // this.getSafeContent(this.articleData.contentBody)
  	}

   // googleTransliterateFunction(){
   //      var options = {
   //          sourceLanguage:
   //              google.elements.transliteration.LanguageCode.ENGLISH,
   //          destinationLanguage:
   //              [google.elements.transliteration.LanguageCode.MARATHI],
   //          shortcutKey: 'ctrl+g',
   //          transliterationEnabled: true
   //      };
   //      var control = new google.elements.transliteration.TransliterationControl(options);
   //      control.makeTransliteratable(['mycomment']);
   // }

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
        console.log("liked false")
        this.likeIcon='cusIco-okay-o';
        this.likeClass="";
        this.likeButtonClass="inactive";
      }else if (this.articleData.liked=true) {
        console.log("liked true")
        this.likeIcon='cusIco-okay';
        this.likeClass="active";
        this.likeButtonClass=""
      }
    }

    savedOrNot(){
      if (this.articleData.saved==false) {
        console.log('saved false')
        this.saveIcon="cusIco-badge-o";
        this.saveClass="";
        this.saveButtonClass="inactive"
      }else if (this.articleData.saved=true) {
        console.log('saved true')
        this.saveIcon='cusIco-badge';
        this.saveClass="active"
        this.saveButtonClass=""
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
           this.likeButtonClass="";
           this.articleData.likeCount = this.articleData.likeCount+1;
           this.analyticsService.sendEvent('pwa/'+this.articleData.headline,'like');  
        }
        if (data.success==false) { 
          this.likeIcon='cusIco-okay-o';
          this.likeClass=""
          this.likeButtonClass="inactive"
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
        this.analyticsService.sendEvent('pwa/'+this.articleData.headline,'comment');
        this.articleCommentModel.userComment="";
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
          this.guideTextImage=true;
          this.savedGuideText=true;
          this.downloadGuideText=false;
          this.saveIcon="cusIco-badge";
          this.saveClass="active";
          this.saveButtonClass=""
          this.articleData.saveCount=this.articleData.saveCount+1;
          this.analyticsService.sendEvent('pwa/'+this.articleData.headline,'save');
          this.snackbarMessage=this.translateService.instant('ContentItemSaved.saved');
          let verticalPosition: MatSnackBarVerticalPosition
          this.openSnackBar(this.snackbarMessage,'',verticalPosition)
        }
      },err=>{
        console.log(err)
      })
    }

    onViewMore(){
      if (this.articleData.user_comments.length>0) {
        this.appProvider.current.comments=this.articleData.user_comments.filter(f => f.status == "Reviewed");
        console.log(this.appProvider.current.comments);
        this.router.navigate(['/comments'],{skipLocationChange:false})
      }
      else{
        console.log('no comment to display')
        this.showCustom();
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

  // downloadFile() {
  //     this.http.get("http://52.15.178.19:3002/netpar/downloadFile",{
  //           method: RequestMethod.Get,
  //           responseType: ResponseContentType.Blob,
  //           headers: new Headers({'Content-type': 'application/json'})
  //       }).subscribe(
  //         (response) => {
  //           this.guideTextImage=true;
  //           this.downloaded();
  //           console.log(response);
  //           var mediaType = 'image/png';
  //           var blob = new Blob([response.blob()], {type: mediaType});
  //           console.log(blob);
  //           var filename = 'pretty image.png';
  //           saveAs(blob, filename);
  //         });
  //   }

    downloaded(){
      this.allPostsService.downloadPost(this.articleData._id,this.userData._id).subscribe(response=>{
        console.log(response);
        if (response.success==true) {
         this.downloadIcon="cusIco-donload";
         this.downloadClass="active";
         this.downloadButtonClass="";
        }
      })
    }

  getSafeUrl(url){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onContinueReading(){

    $('.read-panel').css('height','auto');
    this.allPostsService.continueReading(this.articleData._id).subscribe(data=>{
        console.log(data);
    },error=>{
      console.log(error)
    })
    this.continueButtonVisible=false
    //return this.continueClass="";
  }

  openSnackBar(message: string, action: string,config) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

 onTransliteration(value,event){
   var myEl=event.target
   this.elementRefrence=event
   let post =this.getCaretPos(event)
   this.currentString=value
   let subValue=value.substring(0, post)
   let localValue=subValue.split(' ')
   let length=localValue.length
   let letstring=localValue[length-1]
   let replcedstring=letstring.match(/[a-zA-Z]+/g);
   let stringForSend
   if (replcedstring) {
     stringForSend=replcedstring[0]
   }
   if (!stringForSend) {
     return 
   }
   else if(stringForSend=='') {
      return 
   }
   else if (/^[a-zA-Z]+$/.test(stringForSend)) {
    this.sendString=stringForSend.toString()
    this.translationService.onGetSuggetiion(stringForSend)
        .subscribe(data => {     
            this.appProvider.current.suggestedString=data
            this.outputStringArrayLength=this.appProvider.current.suggestedString.length
            this.currentActiveIndex=-1;
            this.inputStringLength=this.sendString.length
           },error=>{        
     })
   }
 }

  getCaretPos(oField) {
    if (oField.selectionStart || oField.selectionStart == '0') {
       this.caretPos = oField.selectionStart;
       return this.caretPos
    }
  }

  clearSuggstion(){
    this.appProvider.current.suggestedString=[]
  }

  onKeyUp(event){
    console.log(event.keyCode )
    if(event.keyCode==32){
      this.currentString=this.currentString.toString()
      if (this.appProvider.current.suggestedString.length>0) {
          if (this.currentActiveIndex==-1 || this.currentActiveIndex==0) {
           let replaceWith=this.appProvider.current.suggestedString[0]
           let output=this.currentString.replace(this.sendString ,replaceWith)
          this.articleCommentModel.userComment=output
          this.appProvider.current.suggestedString=[]
          }else{
           let replaceWith=this.appProvider.current.suggestedString[this.currentActiveIndex]
           let output=this.currentString.replace(this.sendString ,replaceWith)
           this.articleCommentModel.userComment=output
           this.appProvider.current.suggestedString=[]
          }
      }
    }else if (this.selectedValue && event.keyCode==13) {
     this.currentString=this.currentString.toString()
     if (this.outputStringArrayLength>0) {
          let replaceWith=this.selectedValue+' '
          let output=this.currentString.replace(this.sendString ,replaceWith)
          this.articleCommentModel.userComment=output
          this.appProvider.current.suggestedString=[]
      }
    }else if (event.keyCode==38) {
       if (this.currentActiveIndex==-1 || this.currentActiveIndex==0) {
         this.currentActiveIndex=this.outputStringArrayLength-1
       }else{
         this.currentActiveIndex=this.currentActiveIndex-1
       }
    }else if (event.keyCode==40) {
       if (this.currentActiveIndex==this.currentActiveIndex-1) {
         this.currentActiveIndex=0
       }else{
         this.currentActiveIndex=this.currentActiveIndex+1
       }
    }
  }

  onSuugestionkeyup(suggestion){
    this.selectedValue=suggestion
  }

  selectString(suggestion){
     this.currentString=this.currentString.toString()
     this.outputStringLength=suggestion.length
     let replaceWith=suggestion+' '
     let output=this.currentString.replace(this.sendString ,replaceWith)
     this.articleCommentModel.userComment=output
     let sumIndex=(this.caretPos+this.outputStringLength)-this.inputStringLength;
     this.appProvider.current.suggestedString=[];
  }

   showCustom() {
      this.toastr.custom('<span style="color: red">no more comments to show</span>', null, {enableHTML: true});
   }

   onViewMoreComments(){
     this.viewAllComment=true;
     console.log(this.viewAllComment)
   }


   viewArticle(){
     this.allPostsService.viewPost(this.articleData._id,this.userData._id,this.articleData.sectionId,this.articleData.categoryId).subscribe(response=>{
       console.log(response);
     },error=>{
       console.log(error);
     })
   }

   onSuggestedArticle(suggestedArticle){
     this.appProvider.current.articleDetails=suggestedArticle;
     this.ngOnInit();
   }

   onGuideTextImage(){
     this.guideTextImage=false;
   }


   download(url,type) {
    let typeOfmedia
    let filenameMedia=url.split('/')
    let length=filenameMedia.length
    if (type=='image') {
        typeOfmedia='image/*'
    }else if (type=='audio') {
        typeOfmedia='audio/*'
    }else if (type=='video') {
         typeOfmedia='video/*'
    }else{
         typeOfmedia='application/*'
    }
    let a={
      mediaUrl:url
    }
        this.http.post("http://52.15.178.19:3002/netpar/downloadFile", a, {
            method: RequestMethod.Post,
            responseType: ResponseContentType.Blob,
            headers: new Headers({'Content-type': 'application/json'})
        }).subscribe(
            (response) => {
                this.downloaded();
                if (localStorage['downloadMedia'] && type=='image') {
                  this.downloadedMedia=JSON.parse(localStorage['downloadMedia'])
                }
                this.analyticsService.sendEvent('pwa/'+this.articleData.headline,'Download'); 
                this.downloadedMedia.push({url:a})
                localStorage['downloadMedia']=JSON.stringify(this.downloadedMedia);
                var blob = new Blob([response.blob()], {type: typeOfmedia});
                var filename = filenameMedia[length-1];
                saveAs(blob, filename);
        }
    );
    // private throwPromise(error: any): Promise<any> {
    //     let details = error.json().messages;
    //     alert("Failure :" + details);
    //     return Promise.reject(error);
    // }
  }

   onDownload(){
      // var url = "http://ionicteam.com/netpar/uploads/android/pretty image(3).png";
      // this.download(url,'image')
      for (var i = 0; i < this.articleData.contentBody.length; ++i) {
        if (this.articleData.contentBody[i].tag=='image' && this.articleData.contentBody[i].downloadable==true) {
          var url = this.articleData.contentBody[i].url;
          this.download(url,'image')
        }
        if(this.articleData.contentBody[i].tag=='audio' && this.articleData.contentBody[i].downloadable==true){
           var url = this.articleData.contentBody[i].url;
            this.download(url,'audio')
        } 
        if (this.articleData.contentBody[i]=='video' && this.articleData.contentBody[i].downloadable==true) {
           var url = this.articleData.contentBody[i].url;
            this.download(url,'video')
         }
         if (this.articleData.contentBody[i]=='document' && this.articleData.contentBody[i].downloadable==true) {
            var url = this.articleData.contentBody[i].url;
            this.download(url,'document')
         }  
      }
    }  


    forFirstTimeUser(){
      if(localStorage['userArticalView']==0){
        let userArticleView=localStorage['userArticalView'];
        let b=userArticleView+1;
        localStorage['userArticalView']=b;
        this.openDownloadPopup();
      }
    }

    openDownloadPopup(){
      let dialogRef = this.dialog.open(DownloadPopupComponent, {
            width: '260px',
        });
        dialogRef.afterClosed().subscribe(result => {
          if(result=="navigateToPlayStore"){
            window.open("https://play.google.com/store/apps/developer?id=WhatsApp+Inc.&hl=en");  
          }
        });
    }

    sectionSeprator(){
       for (var i = 0; i < this.articleData.contentBody.length; ++i) {
          if (this.articleData.contentBody[i].tag=='text'){
            var showChar = 120;
            var ellipsestext = "...";
            let text =this.articleData.contentBody[i].text
            console.log(text.length)
            let finalText=text.split(' ')
            console.log(finalText)
            console.log(finalText.length)
            if(finalText.length > showChar) {
              for (var i = 0; i <120; i++) {
                this.textFirstSpan=this.textFirstSpan+finalText[i]+' '
              }
              for (var i = 120; i <finalText.length; i++) {
                this.textSecondSpan=this.textSecondSpan+finalText[i]+' '
              }
              // this.textFirstSpan = this.articleData.contentBody[i].text.substr(0, showChar);
              // this.textSecondSpan = this.articleData.contentBody[i].text.substr(showChar-1, this.articleData.contentBody[i].text.length - showChar);
              console.log(this.textFirstSpan)
              console.log(this.textSecondSpan)
            }
         }
       }
    }

    getHeight(){
      var upper_box = $('.upper-box').outerHeight();
      var wrap_text = $('.wrap-text').outerHeight();
      console.log(upper_box);
      var combine_height = upper_box + wrap_text;
      console.log(combine_height);
      $('.read-panel').css('height',combine_height);
    }

}
