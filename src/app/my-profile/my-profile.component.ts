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
    base64textString;
    editMobileNumber=false;
    editgender=false;
    editAddress=false;
    editDob=false;
    days;
    months;
    years;
    dateValue;
    totalYears=100;
    profilePicture=localStorage['profileImage'];
    constructor(private updateprofileService:UpdateprofileService,private domSanitizer:DomSanitizer,private router:Router,private appProvider:AppProvider,private allPostsService:AllPostsService,location: Location,  private element: ElementRef) {
      this.userId=this.userInfo._id;
    	this.location = location;
      this.sidebarVisible = false;
      this.getSavedPost();
      console.log(this.profilePicture)
    }

  	ngOnInit() {
  		//this.listTitles = ROUTES.filter(listTitle => listTitle);
      this.userData=JSON.parse(localStorage['userInfo']);
  		const navbar: HTMLElement = this.element.nativeElement;
  		this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      this.uploadImage();
      this.getDays();
      this.getMonths();
      this. getYears();
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
           if (response.success==true) {
             localStorage['profileImage']=response.url;
           }
        })
     }
   }

   edit(field){
     console.log(field)
     if (field=='mobileNumber') {
        this.editMobileNumber=true;
        this.editgender=false
        this.editAddress=false
        this.editDob=false
     }
     if (field=='gender') {
       this.editgender=true
       this.editMobileNumber=false;
       this.editAddress=false
        this.editDob=false
     }
     if (field=='address') {
        this.editAddress=true
        this.editMobileNumber=false;
        this.editgender=false
        this.editDob=false

     }
     if (field=='dob') {
        this.editDob=true
        this.editAddress=false
        this.editMobileNumber=false;
        this.editgender=false
     }
   }

   onSend(field){
       if (field=='mobileNumber'){
        this.editMobileNumber=false;

       }
      if (field=='gender'){
         this.editgender=false;

      }
      if (field=='address'){
        this.editAddress=false

      }
      if (field=='dob'){
        this.editDob=false
      }
   }

      // ----------------------------calender------------------
    getDays(){
        this.days = [];
        for(var i=1;i<=31;i++){
              if(i<=9){
                this.dateValue = '0' + i;
              } else {
                 this.dateValue = i;
              }
              this.days.push({value:this.dateValue});
        }
        // alert (JSON.stringify(this.days));
        return this.days;
    }

    getMonths(){
      var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      this.months = [];
      for(var i=1;i<=12;i++){
        this.months.push({name: monthNames[i - 1]});
      }
        // alert(JSON.stringify(this.months))
        return this.months;
    }


    getYears(){
      var currentYear = new Date().getFullYear();
      this.years=[];
      for (var i = currentYear; i > currentYear - this.totalYears; i--) {
          this.years.push({year: [i - 1]});
      }
      return this.years;
    }


}
