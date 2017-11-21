import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AllPostsService } from '../providers/allPost.service';
import { AppProvider } from '../providers/app';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {UpdateprofileService} from './updateprofile.service'

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  providers:[AllPostsService,UpdateprofileService]
})
export class MyProfileComponent implements OnInit {

   	private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    count:number=1;
    userId;
    userData;
    savedPosts;
    userInfo=JSON.parse(localStorage['userInfo']);
    base64textString

    constructor(private updateprofileService:UpdateprofileService,private domSanitizer:DomSanitizer,private router:Router,private appProvider:AppProvider,private allPostsService:AllPostsService,location: Location,  private element: ElementRef) {
      this.userId=this.userInfo._id;
    	this.location = location;
      this.sidebarVisible = false;
      this.getSavedPost();
      console.log(this.userInfo)
    }

  	ngOnInit() {
  		//this.listTitles = ROUTES.filter(listTitle => listTitle);
      this.userData=JSON.parse(localStorage['userInfo']);
  		const navbar: HTMLElement = this.element.nativeElement;
  		this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      this.uploadImage();
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

    // --------------------------------------mukul-----------------------------------

    getSavedPost(){
      this.allPostsService.getSavedPosts(this.userId).subscribe(data=>{
        if (data.success==true) {
          this.savedPosts=data.saved_articles;
        }
      },err=>{

      })
    }

    colorClass(i){
      if (i%7==0) {
        return "color-red";
      }
      else if (i%7==1) {
        return "color-orange";
      }
      else if (i%7==2) {
        return "color-yellow";
      }
       else if (i%7==3) {
        return "color-blue";
      }
       else if (i%7==4) {
        return "color-green";
      }
       else if (i%7==5) {
        return "color-purple";
      }
       else if (i%7==6) {
        return "color-pink";
      }
    }


  onSaved(articleData){
    this.appProvider.current.articleDetails=articleData;
    this.router.navigate(["/article-details"],{skipLocationChange:true});
  }

  selectImage(evt){
      // var files = event.target.files;
      // var file = files[0];
      // if (files && file) {
      //     var reader = new FileReader();

      //     reader.onload =this._handleReaderLoaded.bind(this);

      //     reader.readAsBinaryString(file);
      // }

      if (!evt.target) {
            return;
        }
        if (!evt.target.files) {
            return;
        }
        if (evt.target.files.length !== 1) {
            return;
        }
        const file = evt.target.files[0];
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif' && file.type !== 'image/jpg') {
            return;
        }
        const fr = new FileReader();
        fr.onloadend = (loadEvent) => {
            this.appProvider.current.profilImagePath = fr.result;
             this.router.navigate(['/crop-image'],{skipLocationChange:true})
        };
        fr.readAsDataURL(file);
  }

  _handleReaderLoaded(readerEvt) {
     var binaryString = readerEvt.target.result;
     this.base64textString= btoa(binaryString);
     console.log(btoa(binaryString));
  }


  imageUploadForGridOneIndexEvent(evt: any,) {
      if (!evt.target) {
          return;
      }
      if (!evt.target.files) {
          return;
      }
      if (evt.target.files.length !== 1) {
          return;
      }
      const file = evt.target.files[0];
      if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif' && file.type !== 'image/jpg') {
          return;
      }
      const fr = new FileReader();
      fr.onloadend = (loadEvent) => {
        this.appProvider.current.profilImagePath = fr.result;
      };
      fr.readAsDataURL(file);
   }

 
   uploadImage(){
     if (this.appProvider.current.cropedImage) {
        this.updateprofileService.updateProfilePicture(this.appProvider.current.cropedImage,this.userId).subscribe(response=>{
         console.log(response);
         })
     }
   }


}
