import { Component, OnInit } from '@angular/core';
import { AllPostsService } from '../providers/allPost.service'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { PopupComponent } from '../alerts/popup/popup.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

}
