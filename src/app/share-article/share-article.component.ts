import { Component, OnInit } from '@angular/core';
import { AllPostsService } from '../providers/allPost.service'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { PopupComponent } from '../alerts/popup/popup.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

declare var $:any;
declare var jQuery:any;
@Component({
  selector: 'app-share-article',
  templateUrl: './share-article.component.html',
  styleUrls: ['./share-article.component.css'],
  providers:[AllPostsService]
})
export class ShareArticleComponent implements OnInit {
  articleData;
  viewAllComment;
  latestComment;
  continueToArticle=true;
  continueButtonVisible=true;
  textFirstSpan:string='';
  textSecondSpan:string='';
  continueClass="read-panel";
  constructor(private dialog: MatDialog,private domSanitizer:DomSanitizer,private allPostsService:AllPostsService,private route: ActivatedRoute,private location: Location) { }

  ngOnInit() {
  	this.getSharedArticle();

  }

  getSharedArticle(){
  	const id = this.route.snapshot.paramMap.get('id');
  	console.log(id);
  	 this.allPostsService.sharedArticle(id).subscribe(result=>{
       console.log(result);
       this.articleData=result.response;
       this.getComments();
       this.sectionSeprator()
     })
  }

  getSafeContent(content) {
    return this.domSanitizer.bypassSecurityTrustHtml(content);
  }

  getSafeUrl(url){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onViewMoreComments(){
     this.viewAllComment=true;
     console.log(this.viewAllComment)
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

    onAnyWhere(){
      this.openDialog("Download from playstore");
    }


     openDialog(msg): void {
        let dialogRef = this.dialog.open(PopupComponent, {
            width: '240px',
            data:{ message:msg}
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            if (result=="yes") {
              window.open("https://play.google.com/store/apps/developer?id=WhatsApp+Inc.&hl=en");
            }
          }
        });
    }

    onDownload(){
       window.open("https://play.google.com/store/apps/developer?id=WhatsApp+Inc.&hl=en");
    }

    onContinueArticle(){
     
      this.continueToArticle=false;
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
